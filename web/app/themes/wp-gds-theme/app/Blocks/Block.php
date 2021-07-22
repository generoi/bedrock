<?php

namespace App\Blocks;

use Log1x\AcfComposer\Block as BaseBlock;

abstract class Block extends BaseBlock
{
    public function render($block, $content = '', $preview = false, $post_id = 0)
    {
        preg_match('/is-style-([^\s]+)/', $block['className'] ?? '', $matches);

        $this->style = $matches[1] ?? 'default';

        return parent::render(...func_get_args());
    }

    public function fields()
    {
        return [];
    }
}
