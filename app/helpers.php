<?php

/**
 * Theme helpers.
 */

namespace App;

function smartcrop_focus(int $id)
{
    if (get_post_meta($id, '_wpsmartcrop_enabled', true) == 1) {
        $focus = get_post_meta($id, '_wpsmartcrop_image_focus', true);
        if ($focus && is_array($focus) && isset($focus['left']) && isset($focus['top'])) {
            return [
              round(intval($focus['left']), 2),
              round(intval($focus['top' ]), 2),
            ];
        } else {
            return apply_filters('wpsmartcrop_default_focus', [50, 50], $id);
        }
    }
}
