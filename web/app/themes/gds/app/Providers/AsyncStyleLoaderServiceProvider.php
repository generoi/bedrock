<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AsyncStyleLoaderServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_filter('style_loader_tag', [$this, 'styleLoaderTag'], 999, 2);
    }

    /**
     * Load styles asynchronously.
     */
    public function styleLoaderTag(string $html, string $handle): string
    {
        if (is_admin()) {
            return $html;
        }

        $strategy = wp_styles()->get_data($handle, 'strategy');
        if ($strategy !== 'async') {
            return $html;
        }

        $dom = new \DOMDocument();
        $dom->loadHTML($html);
        /** @var \DOMElement $tag */
        $tag = $dom->getElementsByTagName('link')->item(0);
        $tag->setAttribute('media', 'print');
        $tag->setAttribute('onload', "this.media='all'");
        $tag->removeAttribute('type');
        $tag->removeAttribute('id');
        $html = $dom->saveHTML($tag);

        return $html;
    }
}
