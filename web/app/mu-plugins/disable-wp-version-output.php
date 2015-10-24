<?php
/**
 * Remove the version number of WP so that hackers cant use that to their advantage
 * inspired by https://premium.wpmudev.org/blog/how-to-hide-your-wordpress-version-number/
 * and
 * http://frankiejarrett.com/2012/05/how-to-hide-your-wordpress-version-number-completely/
 */


/**
 *  Removes the Wordpress version number from the head in the output
 *  <meta name="generator" content="WordPress 4.3.1" />
 *  on both the markup of all themes used, and in the RSS feed
 */
add_filter('the_generator', function () {return '';});


/**
 * We also need to remove wp version number from the script and css loaders.
 * since they output version number as parameter on the resource
 * in you check with the inspector it will add the version number of wordpress
 * if there is not a specific version set on the script loader
 *
 * dashicons.css?ver=4.3.1
 * admin-bar.css?ver=4.3.1
 * adminbar.css?ver=2.3.5
 * twemoji.js?ver=4.3.1
 * wp-emoji.js?ver=4.3.1
 *
 * Hide WP version strings from scripts and styles
 * @return {string} $src
 * @filter script_loader_src
 * @filter style_loader_src
 */
function genero_remove_wp_version_strings( $src ) {
     global $wp_version;
     parse_str(parse_url($src, PHP_URL_QUERY), $query);
     if ( !empty($query['ver']) && $query['ver'] === $wp_version ) {
          $src = remove_query_arg('ver', $src);
          $src = add_query_arg('xyz',crypt($wp_version, 'somesalt'), $src);
     }
     return $src;
}
add_filter( 'script_loader_src', 'genero_remove_wp_version_strings' );
add_filter( 'style_loader_src', 'genero_remove_wp_version_strings' );
