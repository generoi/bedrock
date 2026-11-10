<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class OptimizeBlockImages
{
    public function __construct()
    {
        add_filter('render_block_core/media-text', [$this, 'renderMediaTextBlock'], 10, 2);
        add_filter('wp_content_img_tag', [$this, 'removeAutoSizes']);
    }

    /**
     * Core prepends `auto` to a lazy image's sizes, which makes the browser use
     * the image's box width; drop it from images whose sizes are set here.
     */
    public function removeAutoSizes(string $image): string
    {
        $processor = new WP_HTML_Tag_Processor($image);
        if (! $processor->next_tag('img') || ! $processor->has_class('has-custom-sizes')) {
            return $image;
        }

        $processor->set_attribute('sizes', str_replace('auto, ', '', (string) $processor->get_attribute('sizes')));

        return $processor->get_updated_html();
    }

    public function renderMediaTextBlock(string $content, array $block): string
    {
        $focalPoint = $block['attrs']['focalPoint'] ?? null;
        $mediaWidth = $block['attrs']['mediaWidth'] ?? 50;
        $processor = new WP_HTML_Tag_Processor($content);
        if (! $processor->next_tag('img')) {
            return $content;
        }

        // We hide the background image use the <img> with objet-fit: contain, but need the position.
        if ($focalPoint) {
            $style = sprintf('object-position: %s%% %s%%;', $focalPoint['x'] * 100, $focalPoint['y'] * 100);
            $processor->set_attribute('style', $style);
        }
        // A fill image (object-fit: cover) is drawn wider than its column when
        // it is wider than the column's shape, so widen sizes by that much
        // (a column of 50% is about square).
        $meta = wp_get_attachment_metadata($block['attrs']['mediaId'] ?? 0);
        if ($mediaWidth && ! empty($block['attrs']['imageFill']) && ! empty($meta['width']) && ! empty($meta['height'])) {
            $mediaWidth = min(100, round($mediaWidth * max(1, ($meta['width'] / $meta['height']) / ($mediaWidth / 50)), 1));
            $processor->add_class('has-custom-sizes');
        }

        // Calculate the sizes based on media width.
        if ($mediaWidth) {
            $sizes = sprintf('(min-width: 600px) %svw, (min-width: 1230px) %spx, 100vw', $mediaWidth, 1200 * ($mediaWidth / 100));
            $processor->set_attribute('sizes', $sizes);
        }

        return $processor->get_updated_html();
    }
}
