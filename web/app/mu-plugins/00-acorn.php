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
 * Register providers, modify middleware and boot the application.
 */
Application::configure()
    ->withProviders([
    ])
    ->withMiddleware(function (Middleware $middleware) {
        // Remove session cookie
        $middleware->removeFromGroup('web', [
            StartSession::class,
            ShareErrorsFromSession::class,
        ]);
    })
    ->boot();
