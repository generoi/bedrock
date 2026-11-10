<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class ColumnsGap
{
    public function __construct()
    {
        add_filter('render_block_core/columns', [$this, 'renderColumnsGap'], 10, 2);
    }

    /**
     * Expose the columns' Block spacing (blockGap) as variables for the theme's
     * columns CSS (core-columns.scss). The theme keeps blockGap off globally, as
     * core's gap styles would replace its block gutters, so core does not
     * render it.
     */
    public function renderColumnsGap(string $content, array $block): string
    {
        $gap = $block['attrs']['style']['spacing']['blockGap'] ?? null;
        if (! $gap) {
            return $content;
        }

        $row = is_array($gap) ? ($gap['top'] ?? null) : $gap;
        $column = is_array($gap) ? ($gap['left'] ?? null) : $gap;
        $vars = array_filter([
            $row ? '--columns-row-gap: '.self::value($row) : null,
            $column ? '--columns-column-gap: '.self::value($column) : null,
        ]);
        if (! $vars) {
            return $content;
        }

        $processor = new WP_HTML_Tag_Processor($content);
        $processor->next_tag();
        $style = trim((string) $processor->get_attribute('style'), ' ;');
        $processor->set_attribute('style', implode('; ', array_filter([$style, ...$vars])));

        return $processor->get_updated_html();
    }

    /** `var:preset|spacing|block-gutter-l` => `var(--wp--preset--spacing--block-gutter-l)`. */
    protected static function value(string $value): string
    {
        if (str_starts_with($value, 'var:preset|spacing|')) {
            return 'var(--wp--preset--spacing--'._wp_to_kebab_case(substr($value, strlen('var:preset|spacing|'))).')';
        }

        return wp_sanitize_block_gap_value($value) ?: '';
    }
}
