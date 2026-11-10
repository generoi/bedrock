<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class GroupColumnCount
{
    public function __construct()
    {
        add_filter('render_block_core/group', [$this, 'renderGroupColumnCount'], 10, 2);
    }

    /**
     * Expose the grid's column count and minimum column width as variables, so
     * the theme's grid CSS (core-group.scss) wraps responsively with them.
     */
    public function renderGroupColumnCount(string $content, array $block): string
    {
        $layout = $block['attrs']['layout'] ?? [];
        if (($layout['type'] ?? null) !== 'grid') {
            return $content;
        }

        $vars = array_filter([
            isset($layout['columnCount']) ? sprintf('--grid-columns: %d', $layout['columnCount']) : null,
            isset($layout['minimumColumnWidth']) ? sprintf('--group-grid-min-width: %s', $layout['minimumColumnWidth']) : null,
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
}
