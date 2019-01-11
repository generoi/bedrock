<?php

/**
 * @file
 * Contains Timber and Twig configurations and theme specific twig
 * filters/functions.
 */

namespace App;

use Timber;
use TimberExtended;
use Twig_SimpleFilter;
use GeneroWP\Hero\Hero;

/**
 * Define where to look for twig templates.
 */
add_action('after_setup_theme', function () {
    if (class_exists('Timber')) {
        Timber::$dirname = config('timber.dirname');
        Timber::$cache = config('timber.cache');
    }
});

 /**
 * Use custom Timber subclasses.
 */
add_filter('timber_extended/class', function ($class_name, $type, $object = null) {
    switch ($type) {
        case 'post':
            return __NAMESPACE__ . '\\Controllers\\Post';
        case 'term':
            return __NAMESPACE__ . '\\Controllers\\Term';
        case 'image':
            return __NAMESPACE__ . '\\Controllers\\Image';
    }
    return $class_name;
}, 10, 3);

/**
 * Use custom TimberPost subclasses.
 */
add_filter('Timber\PostClassMap', function ($post_class) {
    static $map;
    if (!isset($map)) {
        foreach (get_post_types(['_builtin' => false], 'objects') as $post_type) {
            $map[$post_type->name] = __NAMESPACE__ . '\\Controllers\\Post';
        };

        $map['post'] = __NAMESPACE__ . '\\Controllers\\Post';
        $map['page'] = __NAMESPACE__ . '\\Controllers\\Post';
        $map['product'] = __NAMESPACE__ . '\\Controllers\\ProductPost';
    }
    return $map;
});

/**
 * Site components injected into every timber context.
 */
add_filter('timber/context', function ($context) {
    $context['primary_menu'] = new TimberExtended\Menu('primary_navigation');
    $context['language_menu'] = new TimberExtended\LanguageMenu('language-menu');

    // Add your sidebars.
    $context['sidebar__primary'] = Timber::get_widgets('sidebar-primary');
    $context['sidebar__footer'] = Timber::get_widgets('sidebar-footer');
    $context['sidebar__content_below'] = Timber::get_widgets('sidebar-content_below');

    // wp-hero
    $context['hero'] = new Hero();

    // ACF Options
    $context['options'] = get_fields('option');

    if (function_exists('woocommerce_breadcrumb')) {
        $context['breadcrumb'] = Timber\Helper::ob_function('woocommerce_breadcrumb', [[
            'delimiter' => '',
            'wrap_before' => '<ul class="woocommerce-breadcrumb breadcrumbs">',
            'wrap_after' => '</ul>',
            'before' => '<li>',
            'after' => '</li>',
        ]]);
    } elseif (function_exists('yoast_breadcrumb')) {
        $context['breadcrumb'] = yoast_breadcrumb('', '', false);
    }

    // WooCommerce Menu Bar Cart integration.
    if (class_exists('WpMenuCart')) {
        $wp_menu_cart = new \WpMenuCart();
        $wp_menu_cart->load_classes();
        $context['wp_menu_cart'] = $wp_menu_cart->wpmenucart_menu_item();
    }

    return $context;
});

/**
 * Configure twig with functions and filters.
 *
 * @param Twig_Environment $twig
 * @return Twig_Environment
 */
add_filter('timber/twig', function ($twig) {
    // Use Finnish number format by default.
    $twig->getExtension('Twig_Extension_Core')->setNumberFormat(0, ',', ' ');

    // Get the asset path using Sage logic
    $twig->addFunction(new Timber\Twig_Function('asset_path', function ($filename) {
        return asset_path($filename);
    }));

    // Wrap the asset in a TimberImage object.
    $twig->addFunction(new Timber\Twig_Function('asset_image', function ($filename) {
        return new App\Controllers\Image(asset_path($filename));
    }));

    // Format a phone number string.
    $twig->addFilter(new Twig_SimpleFilter('format_phone', function ($number) {
        return Utils\format_phone($number);
    }));

    // Register Foundation helpers.
    sage('foundation')->registerTwig($twig);

    return $twig;
});
