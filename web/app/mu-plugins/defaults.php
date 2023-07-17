<?php

/*
Plugin Name:  WP Defaults
Plugin URI:   https://genero.fi
Description:  Various defaults for WP
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

if (!is_blog_installed()) {
    return;
}
/**
 * Entirely disable XMLRPC.
 */
if (defined('XMLRPC_REQUEST') && XMLRPC_REQUEST) {
    exit;
}

/**
 * Disable dashboard browse-happy requests / widget
 */
if (is_blog_admin() && !empty($_SERVER['HTTP_USER_AGENT'])) {
    add_filter('pre_site_transient_browser_' . md5($_SERVER['HTTP_USER_AGENT']), '__return_empty_array');
}

/**
 * Disable dashboard php version widget (avoid unecessary SQL queries and HTTP requests)
 */
if (is_blog_admin()) {
    add_filter('pre_site_transient_php_check_' . md5(phpversion()), function ($default) {
        return ['is_acceptable' => true];
    });
}

/**
 * Disable creation of default gravityform admin notification.
 */
add_filter('gform_default_notification', '__return_false');

/**
 * Prevent modification of .htaccess by WordPress.
 */
add_filter('flush_rewrite_rules_hard', '__return_false', 99, 1);

/**
 * Remove accents from media uploads
 */
add_filter('sanitize_file_name', 'remove_accents', 10, 1);

/**
 * Disable conversion of wysiwyg smilies codes to images
 */
add_filter('pre_option_use_smilies', '__return_zero', 10, 1);

/**
 * Disable XML-RPC
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Remove emojis and smilies hooks
 */
remove_action('init', 'smilies_init', 5);
remove_filter('the_content', 'convert_smilies', 20);
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    add_filter('wp_resource_hints', function (array $urls, string $relationType) {
        if ($relationType === 'dns-prefetch') {
            $urls = array_diff($urls, [
                apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/'),
            ]);
        }
        return $urls;
    }, 10, 2);
});


/**
 * @see https://github.com/Automattic/wp-super-cache/issues/397
 */
add_action('plugins_loaded', function () {
    remove_action('gc_cache', 'wpsc_timestamp_cache_update');
});

/**
 * Remove useless capital_P_dangit filter
 */
remove_filter('wp_title', 'capital_P_dangit', 11);
remove_filter('the_title', 'capital_P_dangit', 11);
remove_filter('the_content', 'capital_P_dangit', 11);
remove_filter('widget_text_content', 'capital_P_dangit', 11);
remove_filter('comment_text', 'capital_P_dangit', 31);

/**
 * Remove Yoast columns from Admin UI screen options by default.
 */
add_filter('default_hidden_columns', function () {
    $hidden[] = 'wpseo-score';
    $hidden[] = 'wpseo-score-readability';
    return $hidden;
});

/**
 * Remove yoast from Admin bar.
 */
add_action('wp_before_admin_bar_render', function () {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('wpseo-menu');
});

/**
 * Remove yoast from dashboard.
 */
add_action('wp_dashboard_setup', function () {
    remove_meta_box('wpseo-dashboard-overview', 'dashboard', 'normal');
});

/**
 * Remove nagging notices
 */
add_filter('pre_site_option_duplicate_post_show_notice', '__return_zero');
add_filter('pre_option_CPT_configured', '__return_true');
add_filter('pre_site_option_ewww_image_optimizer_tracking_notice', '__return_true');
add_filter('pre_site_option_ewww_image_optimizer_enable_help_notice', '__return_true');
add_filter('pre_option_ewww_image_optimizer_tracking_notice', '__return_true');
add_filter('pre_option_ewww_image_optimizer_enable_help_notice', '__return_true');
add_filter('pre_option_scporder_notice', '__return_true');
remove_action('admin_notices', 'woothemes_updater_notice');
remove_action('admin_notices', 'widgetopts_admin_notices');
add_action('admin_head', function () {
    if (!current_user_can('update_core')) {
        remove_action('admin_notices', 'update_nag', 3);
    }
});

/**
 * Disable SEO for post types without title and editor.
 */
add_filter('the_seo_framework_custom_post_type_support', function () {
    return ['title', 'editor'];
});

/**
 * Disable the SEO Bar columns on the post/page/taxonomy selection screens.
 */
add_filter('the_seo_framework_show_seo_column', '__return_false');

/**
 * Set SEO Framework metabox priority to low so it's shown at the bottom.
 */
add_filter('the_seo_framework_metabox_priority', function () {
    return 'low';
});
add_filter('the_seo_framework_term_metabox_priority', function () {
    return 100;
});

/**
 * Move ACF fields above other fields on taxonomy term forms.
 */
add_action('admin_enqueue_scripts', function () {
    global $wp_filter;
    $taxonomy = get_current_screen()->taxonomy;
    if (empty($wp_filter["{$taxonomy}_edit_form"]->callbacks['10'])) {
        return;
    }
    foreach ($wp_filter["{$taxonomy}_edit_form"]->callbacks['10'] as $callback) {
        if (!empty($callback['function'][0]) && $callback['function'][0] instanceof \acf_form_taxonomy) {
            remove_action("{$taxonomy}_edit_form", $callback['function']);
            add_action("{$taxonomy}_edit_form", $callback['function'], 9, 2);
            break;
        }
    }
}, 11);

/**
 * Add edit page links to admin toolbar when "page for post type" plugin is used.
 */
add_action('admin_bar_menu', function () {
    global $wp_admin_bar;
    if (function_exists('get_page_for_post_type') && is_archive() && $page_id = get_page_for_post_type()) {
        $wp_admin_bar->add_node([
            'id' => 'edit',
            'title' => get_post_type_object(get_post_type($page_id))->labels->edit_item,
            'href' => get_edit_post_link($page_id),
        ]);
    }
}, 100);

/**
 * Show Environment in Admin Bar color is backwards from a clients perspective
 */
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\shc_styling', 11);
add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\shc_styling', 11);

function shc_styling()
{
    $styles = "
        #wpadminbar .ab-top-menu .shc-show-env.prod .ab-item,
        #wpadminbar .ab-top-menu .shc-show-env.prod:hover .ab-item {
            background-color: #46b450;
        }
        #wpadminbar .ab-top-menu .shc-show-env.dev .ab-item,
        #wpadminbar .ab-top-menu .shc-show-env.dev:hover .ab-item {
            background-color: #dc3232;
        }
    ";
    wp_add_inline_style('shc-show-env', $styles);
}

add_action('shc_show_env_id_env', function () {
    return match (wp_get_environment_type()) {
        'local' => ['Local', 'dev'],
        'development' => ['Dev', 'dev'],
        'production' => ['Prod', 'prod'],
        'staging' => ['Staging', 'staging'],
    };
});
