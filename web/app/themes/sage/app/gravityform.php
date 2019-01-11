<?php

/**
 * @file
 * Contains Gravityform configurations and field defaults.
 */

/**
 * Allow field labels to be hidden.
 */
add_filter('gform_enable_field_label_visibility_settings', '__return_true');

/**
 * Preselect a selet choice.
 * @see https://www.gravityhelp.com/documentation/article/gform_field_value_parameter_name/
 * @todo untested with Genero\Sage\GravityFormTwig
 */
// add_filter('gform_field_value_contact_category', function ($value, $field, $name) {
//     // Normalize all pages to the finnish language.
//     $post_id = apply_filters('wpml_object_id', get_the_id(), 'page', true, 'fi');
//     foreach ($field['choices'] as $choice) {
//         if ($choice['value'] == $post_id) {
//             return $post_id;
//         }
//     }
//     return $value;
// }, 10, 3);
