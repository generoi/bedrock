<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class AutoPlayMediaTextBlock
{
    public function __construct()
    {
        add_filter('render_block_core/media-text', [$this, 'autoPlayMediaTextBlock']);
    }

    public function autoPlayMediaTextBlock(string $content): string
    {
        $processor = new WP_HTML_Tag_Processor($content);
        if ($processor->next_tag('video')) {
            $processor->set_attribute('autoplay', 'true');
            $processor->set_attribute('muted', 'true');
            $processor->set_attribute('playsinline', 'true');
            $processor->set_attribute('loop', 'true');
            $processor->remove_attribute('controls');
            $content = $processor->get_updated_html();
        }

        return $content;
    }
}
