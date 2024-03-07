<?php

/**
 * @file
 */

namespace components\youtube_embed;

add_action('wp_enqueue_scripts', function () {
    // @todo
    //wp_register_style('sage/youtube-embed.css', asset('components/youtube-embed/index.css')->uri(), [], null);
});

/**
 * Rewrite youtube embeds so that their iframes are lazy loaded.
 */
add_filter('embed_oembed_html', function (string $cache) {
    // Not working in block editor
    if (defined('REST_REQUEST') && REST_REQUEST) {
        return $cache;
    }
    preg_match('/src="([^"]*)"/i', $cache, $match);
    $src = $match[1] ?? null;
    if (! $src) {
        return $cache;
    }

    // @see https://gist.github.com/ghalusa/6c7f3a00fd2383e5ef33
    preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $src, $match);
    $youtubeId = $match[1] ?? null;
    if (! $youtubeId) {
        return $cache;
    }

    // wp_enqueue_style('sage/youtube-embed.css');

    return view('components::youtube-embed.view', [
        'youtube_id' => $youtubeId,
    ]);
});
