<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

/**
 * Use video featured images as poster images.
 */
class VideoPoster
{
    public function __construct()
    {
        add_filter('render_block_core/video', [$this, 'renderVideoBlock'], 10, 2);
        add_filter('render_block_core/cover', [$this, 'renderCoverBlock'], 10, 2);
    }

    public function renderVideoBlock(string $content, array $block): string
    {
        $attachmentId = $block['attrs']['id'] ?? null;
        if (! $attachmentId) {
            return $content;
        }

        return $this->addVideoPosterAttribute($content, $attachmentId);
    }

    public function renderCoverBlock(string $content, array $block): string
    {
        $backgroundType = $block['attrs']['backgroundType'] ?? null;
        $attachmentId = $block['attrs']['id'] ?? null;
        if ($backgroundType !== 'video' || ! $attachmentId) {
            return $content;
        }

        return $this->addVideoPosterAttribute($content, $attachmentId);
    }

    protected function addVideoPosterAttribute(string $content, int $attachmentId): string
    {
        $posterImage = get_the_post_thumbnail_url($attachmentId, 'large');
        if (! $posterImage) {
            return $content;
        }

        $processor = new WP_HTML_Tag_Processor($content);
        while ($processor->next_tag('video')) {
            if ($processor->get_attribute('poster')) {
                continue;
            }
            $processor->set_attribute('poster', $posterImage);
        }

        return $processor->get_updated_html();
    }
}
