<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class SectionLabelledby
{
    public function __construct()
    {
        add_filter('render_block_core/group', [$this, 'render']);
        add_filter('render_block_core/cover', [$this, 'render']);
    }

    /**
     * A group or cover rendered as a <section> becomes a landmark named by its
     * first heading with an id, e.g. `<section aria-labelledby="hero-h">`. A
     * section without a heading is named by its first element with an id
     * instead.
     */
    public function render(string $content): string
    {
        $processor = new WP_HTML_Tag_Processor($content);
        if (! $processor->next_tag() || $processor->get_tag() !== 'SECTION' || $processor->get_attribute('aria-labelledby')) {
            return $content;
        }

        $id = null;
        $fallback = null;
        while ($processor->next_tag()) {
            $tagId = $processor->get_attribute('id');
            if (! is_string($tagId) || $tagId === '') {
                continue;
            }
            if (preg_match('/^H[1-6]$/', $processor->get_tag())) {
                $id = $tagId;
                break;
            }
            $fallback ??= $tagId;
        }
        $id ??= $fallback;
        if (! is_string($id)) {
            return $content;
        }

        $processor = new WP_HTML_Tag_Processor($content);
        $processor->next_tag();
        $processor->set_attribute('aria-labelledby', $id);

        return $processor->get_updated_html();
    }
}
