<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class NamespaceAttribute
{
    public function __construct()
    {
        add_filter('render_block', [$this, 'renderNamespaceAttribute'], 10, 2);
    }

    /**
     * Add a data attribute for block namespaces so that they can be used for styling.
     */
    public function renderNamespaceAttribute(string $content, array $block): string
    {
        $namespace = $block['attrs']['namespace'] ?? null;
        if (! $namespace) {
            return $content;
        }

        $processor = new WP_HTML_Tag_Processor($content);
        $processor->next_tag();
        $processor->set_attribute('data-namespace', $namespace);

        return $processor->get_updated_html();
    }
}
