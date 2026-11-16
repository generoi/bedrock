<?php

/*
Plugin Name:  Acorn bootloader
Plugin URI:   https://genero.fi
Description:  Boot acorn
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Roots\Acorn\Application;
use Roots\Acorn\Configuration\Middleware;
use Roots\Acorn\Session\Middleware\StartSession as AcornStartSession;

if (! is_blog_installed()) {
    return;
}

/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

if (! function_exists('\Roots\bootloader')) {
    wp_die(
        __('You need to install Acorn to use this theme.', 'sage'),
        '',
        [
            'link_url' => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'sage'),
        ]
    );
}

/**
 * Keep WordPress notices from becoming fatal under WP_DEBUG.
 *
 * _doing_it_wrong() and _deprecated_*() raise E_USER_NOTICE/E_USER_DEPRECATED.
 * Acorn's debug error handler, registered here before plugins load, would turn
 * them into exceptions, so one early __() in a plugin (Yoast 28.8's upgrade
 * routine, WooCommerce) 500s every request locally. Let PHP report them as
 * notices instead, as plain WordPress does; warnings and errors still throw.
 */
add_filter('acorn/throw_error_exception', function ($throw, $e) {
    if ($e instanceof \ErrorException && in_array($e->getSeverity(), [E_USER_NOTICE, E_USER_DEPRECATED], true)) {
        return false;
    }

    return $throw;
}, 10, 2);

/**
 * Register providers, modify middleware and boot the application.
 */
Application::configure()
    ->withProviders([
    ])
    ->withMiddleware(function (Middleware $middleware) {
        // Remove session cookie
        // Acorn's web and wordpress groups use its own StartSession subclass,
        // so remove that one too, from both groups.
        foreach (['web', 'wordpress'] as $group) {
            $middleware->removeFromGroup($group, [
                StartSession::class,
                AcornStartSession::class,
                ShareErrorsFromSession::class,
            ]);
        }
    })
    ->boot();
