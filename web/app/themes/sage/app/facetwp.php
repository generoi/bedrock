<?php

/**
 * @file
 * Contains configurations of the FacetWP plugin.
 */

namespace App;

use Timber;

/**
 * Index all woocommerce variations.
 */
add_filter('facetwp_enable_product_variations', '__return_true');

/**
 * Index out of stock products.
 */
add_filter('facetwp_index_all_products', '__return_true');

/**
 * Modify the sort options available.
 */
add_filter('facetwp_sort_options', function ($options, $params) {
    unset($options['title_desc']);
    return $options;
}, 10, 2);

/**
 * Identify the main WP_Query when manually specified.
 */
add_filter('facetwp_is_main_query', function ($is_main_query, $query) {
    if (isset($query->query_vars['facetwp'])) {
        $is_main_query = true;
    }
    return $is_main_query;
}, 10, 2);

/**
 * Allow for custom post types to be indexed using FacetWP.
 */
// add_filter('facetwp_indexer_query_args', function($args) {
//   $args['post_type'] = ['custom-post-type'];
//   return $args;
// });

/**
 * Modify how fields are indexed.
 */
// add_filter('facetwp_index_row', function($params, $class) {
//   switch ($params['facet_name']) {
//     case 'volume':
//       $params['facet_display_value'] = $params['facet_value'] . ' m<sup>3</sup>';
//       break;
//   }
//   return $params;
// }, 10, 2);

/**
 * Foundation themed pager output.
 */
add_filter('facetwp_pager_html', function ($output, $params) {
    $output = Timber::fetch(['facets/pager.twig'], $params);
    return $output;
}, 10, 2);

/**
 * FacetWP sort options are missing translations in most languages.
 */
add_filter('facetwp_sort_options', function ($options, $params) {
    $options['default']['label'] = __('Sort by', '<example-project>');
    $options['title_asc']['label'] = __('Title (A-Z)', '<example-project>');
    $options['title_desc']['label'] = __('Title (Z-A)', '<example-project>');
    $options['date_asc']['label'] = __('Date (Oldest)', '<example-project>');
    $options['date_desc']['label'] = __('Date (Newest)', '<example-project>');
    return $options;
}, 10, 2);

/**
 * Add support between facetwp-polylang and facetwp-hierarchy-select.
 */
add_action('admin_init', function () {
    if (!function_exists('FWP') || !function_exists('PLL')) {
        return;
    }

    $facets = FWP()->helper->get_facets();
    if (!empty($facets)) {
        foreach ($facets as $facet) {
            if (!empty($facet['levels'])) {
                foreach ($facet['levels'] as $level) {
                    pll_register_string('FacetWP', $level);
                }
            }
        }
    }
});
