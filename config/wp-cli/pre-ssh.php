<?php

/**
 * Add vendor binaries to $PATH so that wp-cli is available on the remote host
 * when it's a composer dependency.
 *
 * @see https://runcommand.io/to/wp-ssh-custom-path/
 *
 * @example
 * path: web/wp
 * require:
 *   - config/wp-cli/pre-ssh.php
 * '@production':
 *   ssh: deploy@<remote>/var/www/<remote>/deploy/current/web/wp
 *   url: <url>
 *   bin_path: $HOME/.config/composer/vendor/bin
 *   php_path: /usr/bin/php72
 */

WP_CLI::add_hook('before_ssh', function () {
    $runner = WP_CLI::get_runner();
    $runner->init_config();
    $project_config = $runner->get_project_config_path();
    if ($runner->alias && $project_config) {
        $config = Spyc::YAMLLoad($project_config)[$runner->alias] ?? [];
    }

    // Eg. /var/www/wordpress/web/wp
    $wp_path = WP_CLI\Utils\parse_ssh_url($config['ssh'], PHP_URL_PATH);
    // Eg. /var/www/wordpress
    $project_root = dirname(dirname($wp_path));
    // Eg. /var/www/wordpress/vendor/bin
    if (!empty($config['bin_path'])) {
        $paths[] = $config['bin_path'];
    }
    $paths[] = "$project_root/vendor/bin";
    // Additionally add the users globally installed composer binaries.
    $paths[] = '$HOME/composer/vendor/bin';
    $paths[] = '$HOME/.config/composer/vendor/bin';
    // Add a simple home directory bin path
    $paths[] = '$HOME/bin';
    $paths[] = '$PATH';
    // Drupal VM installs global composer packages in a custom location, readable
    // by all the users.
    $source_profile = '[ -e /etc/profile.d/composer.sh ] && source /etc/profile.d/composer.sh';

    // path to php binary
    $php_path = !empty($config['php_path']) ? 'export WP_CLI_PHP=' . $config['php_path'] : '';

    putenv('WP_CLI_SSH_PRE_CMD=' . $source_profile . ';export PATH=' . implode(':', $paths) . ';' . $php_path . '');
});
