<?php

/*
Plugin Name:  GDS Remove Empty Paragraphs
Plugin URI:   https://genero.fi
Description:  Strip empty core/paragraph blocks from post content on save.
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

if (! defined('ABSPATH')) {
    return;
}

add_filter('content_save_pre', 'gdsRemoveEmptyParagraphBlocks', 20);

function gdsRemoveEmptyParagraphBlocks(string $content): string
{
    if ($content === '' || ! has_blocks($content)) {
        return $content;
    }

    // Match empty core/paragraph blocks, including nested ones in groups/columns.
    $pattern = '/<!-- wp:paragraph\b[^>]*-->\s*<p\b[^>]*>(?:[\s\x{c2a0}]|&nbsp;|<br\s*\/?>)*<\/p>\s*<!-- \/wp:paragraph -->\s*/iu';

    $previous = null;
    while ($previous !== $content) {
        $previous = $content;
        $content = preg_replace($pattern, '', $content) ?? $content;
    }

    return $content;
}
