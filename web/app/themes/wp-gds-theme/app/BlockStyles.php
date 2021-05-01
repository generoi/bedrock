<?php

namespace App;

use Illuminate\Contracts\Container\Container as ContainerContract;
use Illuminate\Support\Str;
use WP_Post;

class BlockStyles
{
    public $blocks = [];
    public $printed = [];
    public $enqueued = [];
    public $app;

    public function __construct(ContainerContract $app)
    {
        $this->app = $app;
    }

    /**
     * Register a stylesheet with WordPress.
     */
    public function registerStyle(string $stylesheet): void
    {
        $block = basename($stylesheet, '.css');
        $handle = $this->getThemeHandle($block);
        $asset = $this->app['assets']->manifest()->get($stylesheet);

        wp_register_style($handle, $asset->uri(), [], null);
        wp_style_add_data($handle, 'path', $asset->path());
    }

    /**
     * Check if a handle has been printed already.
     */
    public function isPrinted(string $handle): bool
    {
        return in_array($handle, $this->printed);
    }

    /**
     * Check if a handle has been enqueued already.
     */
    public function isEnqueued(string $handle): bool
    {
        return in_array($handle, $this->enqueued);
    }

    /**
     * Enqueue the styles needed by the block.
     */
    public function enqueueBlockStyle(string $blockName): void
    {
        $handle = $this->getThemeHandle($blockName);
        if ($this->isPrinted($handle) || $this->isEnqueued($handle)) {
            return;
        }
        $this->blocks[] = $blockName;
        $this->enqueued[] = $handle;

        // If within the limit of critical blocks, inline the stylesheet.
        $criticalBlockCount = $this->app['config']['assets']['blocks.critical_count'] ?? 10;
        if (count($this->blocks) <= $criticalBlockCount) {
            $this->addInlineStyles($handle);
        }
        wp_enqueue_style($handle);
    }

    /**
     * Echo out the stylesheet for the block right away.
     */
    public function printBlockStyle(string $blockName): void
    {
        $handle = $this->getThemeHandle($blockName);
        if ($this->isPrinted($handle)) {
            return;
        }

        $this->enqueueBlockStyle($blockName);
        // Print out the stylesheet tag or inline styles.
        wp_styles()->do_item($handle);
        echo wp_styles()->print_html;
        // Reset the current stack
        wp_styles()->print_html = '';
        // Remove it so it's not printed again in the footer.
        wp_dequeue_style($handle);

        $this->printed[] = $handle;
    }

    /**
     * Return a list of all blocks used in post content in the order that they
     * appear.
     */
    public function getPostBlocks(WP_Post $post): array
    {
        $post = get_post();
        $blocks = parse_blocks($post->post_content);

        $walker = function (array $carry, array $block) use (&$walker): array {
            if ($block['blockName']) {
                $carry[] = $block['blockName'];
            }
            if ($block['innerBlocks']) {
                $carry = array_reduce($block['innerBlocks'], $walker, $carry);
            }
            return $carry;
        };

        $blockNames = array_reduce($blocks, $walker, []);
        return collect($blockNames)
            ->unique()
            ->all();
    }

    /**
     * Get the theme's stylesheet handle.
     */
    public function getThemeHandle(string $blockName): string
    {
        return 'sage/' . Str::after($blockName, '/');
    }

    /**
     * Mark the stylesheet to be inlined  instead of linked to.
     */
    protected function addInlineStyles(string $handle): void
    {
        global $wp_styles;
        $path = wp_styles()->get_data($handle, 'path');
        if ($path && file_exists($path)) {
            $wp_styles->registered[$handle]->src = false;
            $wp_styles->registered[$handle]->extra['after'][] = file_get_contents($path);
            // Inline all dependencies as well.
            foreach ($wp_styles->registered[$handle]->deps as $dependency) {
                $this->addInlineStyles($dependency);
            }
        }
    }
}
