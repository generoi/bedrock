<?php

namespace App\BlockFilters;

class GravityformsDefaultAttributes
{
    public function __construct()
    {
        add_filter('render_block_data', [$this, 'blockData']);
        add_filter('gform_form_block_attributes', [$this, 'blockAttributes']);
    }

    public function blockData(array $parsedBlock): array
    {
        if ($parsedBlock['blockName'] === 'gravityforms/form') {
            if (! isset($parsedBlock['attrs']['ajax'])) {
                $parsedBlock['attrs']['ajax'] = true;
            }
        }

        return $parsedBlock;
    }

    public function blockAttributes(array $attributes): array
    {
        $attributes['ajax']['default'] = true;

        return $attributes;
    }
}
