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
        add_action('wp_head', [$this, 'printScript'], PHP_INT_MAX);
    }

    public function printScript(): void
    {
        echo wp_get_inline_script_tag("
            Array.prototype.slice.call(document.querySelectorAll('[data-async-styles]')).forEach(function (link) {
                if (link.sheet && link.sheet.rules) {
                    link.media = 'all';
                    return;
                }
                link.addEventListener('load', function() {
                    link.media = 'all'
                });
            });
        ");
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

        if (wp_styles()->get_data($handle, 'async')) {
            $tag = str_replace(' src', ' async src', $tag);
        } elseif (wp_styles()->get_data($handle, 'defer')) {
            $tag = str_replace(' src', ' defer src', $tag);
        } else {
            foreach (
                [
                    'defer' => config('assets.deferred_scripts'),
                    'async' => config('assets.async_scripts'),
                ] as $type => $scripts
            ) {
                if (in_array($handle, $scripts)) {
                    $tag = str_replace(' src', " $type src", $tag);
                }
            }
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

        $isAsync = wp_styles()->get_data($handle, 'async') && doing_action('wp_head');
        if (! $isAsync && ! in_array($handle, config('assets.async_styles'))) {
            return $html;
        }

        $dom = new \DOMDocument;
        $dom->loadHTML($html);
        /** @var \DOMElement $tag */
        $tag = $dom->getElementsByTagName('link')->item(0);
        $tag->setAttribute('media', 'print');
        $tag->setAttribute('data-async-styles', '');
        $tag->removeAttribute('type');
        $html = $dom->saveHTML($tag).PHP_EOL;

        return $html;
    }
}
