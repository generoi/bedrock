<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PerformanceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * @see https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/
         */
        add_filter('should_load_separate_core_block_assets', '__return_true');
        add_action('wp_enqueue_scripts', [$this, 'earlyEnqeueueBlockStyles'], 9);

        add_action('wp_enqueue_scripts', [$this, 'replaceWithModernJquery']);
        add_action('wp_enqueue_scripts', [$this, 'maybeRemoveJquery'], 100);
        add_action('wp_print_styles', [$this, 'dequeueAssets'], 100);
        add_filter('script_loader_tag', [$this, 'scriptLoaderTag'], 10, 2);
        add_filter('style_loader_tag', [$this, 'styleLoaderTag'], 999, 2);
        add_filter('wp_content_img_tag', [$this, 'addContentImageLoadingAttribute']);
        add_filter('wp_get_attachment_image_attributes', [$this, 'addLoadingAttribute'], PHP_INT_MAX);
        add_filter('the_content', [$this, 'lazyLoadIframesVideos']);
    }

    /**
     * Always enqueue stylesheets for the following blocks in the <head>
     */
    public function earlyEnqeueueBlockStyles(): void
    {
        render_block(['blockName' => 'core/heading']);
        render_block(['blockName' => 'core/paragraph']);

        // Enqeueue stylesheets of the firt block.
        if (is_singular() && $post = get_post()) {
            if ($blocks = parse_blocks($post->post_content)) {
                render_block($blocks[0]);
            }
        }
    }

    public function maybeRemoveJquery(): void
    {
        // Only load jQuery if gravityforms needs it
        $hasGform = wp_script_is('gform_gravityforms', 'enqueued');
        $isAdmin = is_admin() || current_user_can('edit_posts');
        if (!$isAdmin && !$hasGform) {
            wp_deregister_script('jquery');
        }
    }

    /**
     * Replace core jQuery with theme's jQuery.
     */
    public function replaceWithModernJquery(): void
    {
        wp_deregister_script('jquery');
        wp_deregister_script('jquery-core');
        wp_deregister_script('jquery-migrate');
        wp_register_script('jquery', asset('scripts/jquery.js')->uri(), false, null, true);
    }

    public function dequeueAssets(): void
    {
        if (!is_admin_bar_showing()) {
            wp_deregister_style('dashicons'); // wp core
        }
    }

    /**
     * Add "lazy" loading attribute to all images.
     */
    public function addLoadingAttribute(array $attr): array
    {
        if (is_admin()) {
            return $attr;
        }
        $attr['loading'] = 'lazy';
        return $attr;
    }

    /**
     * Add "lazy" loading attribute to all images in content.
     */
    public function addContentImageLoadingAttribute(string $imageTag): string
    {
        if (!str_contains($imageTag, 'loading="')) {
            $imageTag = str_replace('<img ', '<img loading="lazy" ', $imageTag);
        }
        return $imageTag;
    }

    /**
     * Lazy load all iframes and videos
     */
    public function lazyLoadIframesVideos(string $content): string
    {
        $content = preg_replace(
            '/(<iframe|<video)(.*?)src=\"(.*?)\"(.*?)>/i',
            '$1$2data-src="$3"$4>',
            $content
        );
        return $content;
    }

    /**
     * Load scripts asynchronously.
     */
    public function scriptLoaderTag(string $tag, string $handle): string
    {
        if (is_admin()) {
            return $tag;
        }

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

        switch ($handle) {
            case 'sage/fontawesome.js':
                $tag = str_replace(' src', ' crossorigin="anonymous" src', $tag);
                break;
        }

        return $tag;
    }

    /**
     * Load styles asynchronously.
     */
    public function styleLoaderTag(string $html, string $handle): string
    {
        if (is_admin() || !in_array($handle, config('assets.async_styles'))) {
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
