<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AsyncLoaderServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_filter('script_loader_tag', [$this, 'scriptLoaderTag'], 10, 2);
        add_filter('style_loader_tag', [$this, 'styleLoaderTag'], 999, 2);
    }

    /**
     * Load scripts asynchronously.
     */
    public function scriptLoaderTag(string $tag, string $handle): string
    {
        if (is_admin()) {
            return $tag;
        }

        if ($crossorigin = wp_styles()->get_data($handle, 'crossorigin')) {
            $tag = str_replace(' src', sprintf(' crossorigin="%s" src', $crossorigin), $tag);
        }

        if (wp_scripts()->get_data($handle, 'async')) {
            $tag = str_replace(' src', " async src", $tag);
        } elseif (wp_scripts()->get_data($handle, 'defer')) {
            $tag = str_replace(' src', " defer src", $tag);
        }

        return $tag;
    }

    /**
     * Load styles asynchronously.
     */
    public function styleLoaderTag(string $html, string $handle): string
    {
        if (is_admin()) {
            return $html;
        }

        if (! wp_styles()->get_data($handle, 'async')) {
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
