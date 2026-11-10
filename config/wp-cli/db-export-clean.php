<?php

/**
 * Filters for wp db export-clean command.
 *
 * - Drops test tables (tests_* prefix) entirely
 * - Truncates sensitive/bloat tables (schema only, no data)
 * - Blanks sensitive options (API keys, auth salts, license keys)
 */
WP_CLI::add_hook('after_wp_load', function () {
    add_filter('wp-db-export-clean/table-wheres', function (array $tableWheres): array {
        global $wpdb;

        // WARNING: This filter modifies the live database in-place (blanks secrets,
        // deletes users, drops tables) before exporting. The exported file is clean,
        // but the running database is permanently altered.
        if (getenv('CI') === false) {
            WP_CLI::warning('This command will modify your local database (blank secrets, replace users, drop tables).');
            WP_CLI::confirm('Continue?');
        }

        // Drop test tables entirely (PHPUnit recreates them)
        $testTables = $wpdb->get_col("SHOW TABLES LIKE 'tests_%'");

        foreach ($testTables as $table) {
            $wpdb->query("DROP TABLE IF EXISTS `{$table}`");
        }

        if ($testTables) {
            WP_CLI::log(sprintf('Dropped %d test tables.', count($testTables)));
        }

        // Export schema only (no data) for these tables.
        // Use % prefix to match across all multisite prefixes (wp_, wp_2_, wp_4_, etc.)
        $truncatePatterns = [
            // Search index
            '%relevanssi%',
            // Cache
            '%cache_tags',
            // Email logs (contain full email bodies, password reset links)
            '%wpml_mails',
            '%wpmailsmtp%',
            '%postmark_log',
            // Customer PII
            '%wc_customer_lookup',
            // Order data
            '%wc_order_stats',
            '%wc_order_product_lookup',
            '%wc_order_tax_lookup',
            '%wc_order_coupon_lookup',
            '%woocommerce_order_item%',
            '%woocommerce_sessions',
            // Form submissions and view stats
            '%gf_entry%',
            '%gf_form_view',
            // Scheduled actions
            '%actionscheduler%',
            // WP All Import/Export (history, logs, hash cache)
            '%pmxi_%',
            '%pmxe_%',
            // Comments (may contain customer names/emails from reviews)
            '%comments',
            '%commentmeta',
            // Yoast SEO indexes (rebuilt automatically)
            '%yoast_%',
            // Activity/audit logs
            '%stream%',
            // Cloner logs
            '%ns_cloner_logs',
            // User registrations
            '%signups',
            '%registration_log',
            // WooCommerce admin inbox notifications
            '%wc_admin_note%',
        ];

        foreach ($truncatePatterns as $pattern) {
            $tables = $wpdb->get_col($wpdb->prepare('SHOW TABLES LIKE %s', $pattern));

            foreach ($tables as $table) {
                $tableWheres[$table] = '1 = 0';
            }
        }

        // Blank sensitive options across all multisite options tables.
        // Options are blanked (not deleted) so the rows exist but contain no secrets.
        $sensitiveOptions = [
            // WP auth salts
            'auth_key',
            'auth_salt',
            'secure_auth_key',
            'secure_auth_salt',
            'logged_in_key',
            'logged_in_salt',
            'nonce_key',
            'nonce_salt',
            // License keys
            'polylang_licenses',
            'rg_gforms_key',
            // API keys and tokens
            'postmark_settings',
            'relevanssi_api_key',
            'gravityformsaddon_gravityformsgoogleanalytics_settings',
            // Payment gateway settings (may contain API keys)
            'woocommerce_paypal_settings',
            'woocommerce_stripe_settings',
            // SMTP config (may contain API keys)
            'wp_mail_smtp',
        ];

        $optionsTables = $wpdb->get_col("SHOW TABLES LIKE '%options'");
        $placeholder = implode(',', array_fill(0, count($sensitiveOptions), '%s'));

        foreach ($optionsTables as $table) {
            $wpdb->query(
                $wpdb->prepare(
                    "UPDATE `{$table}` SET option_value = '' WHERE option_name IN ({$placeholder})",
                    ...$sensitiveOptions
                )
            );
        }

        // Also delete transient license keys
        foreach ($optionsTables as $table) {
            $wpdb->query("DELETE FROM `{$table}` WHERE option_name LIKE '%_transient_%license%'");
        }

        WP_CLI::log(sprintf('Blanked sensitive options across %d options tables.', count($optionsTables)));

        // Replace all users with a single dummy admin.
        // Purge usermeta across all multisite prefixes, then recreate a clean admin.
        $usermetaTables = $wpdb->get_col("SHOW TABLES LIKE '%usermeta'");

        foreach ($usermetaTables as $table) {
            $wpdb->query("DELETE FROM `{$table}`");
        }

        $wpdb->query("DELETE FROM {$wpdb->users}");

        $userId = wp_insert_user([
            'user_login' => 'admin',
            'user_email' => 'admin@example.com',
            'user_pass' => 'admin',
            'role' => 'administrator',
        ]);

        if (is_multisite()) {
            grant_super_admin($userId);
        }

        WP_CLI::log('Replaced all users with dummy admin.');

        return $tableWheres;
    });
});
