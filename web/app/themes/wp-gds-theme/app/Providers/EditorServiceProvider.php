<?php

namespace App\Providers;

use Illuminate\Support\Str;
use Roots\Acorn\ServiceProvider;

use function Roots\asset;
use function Roots\config;

class EditorServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_action('after_setup_theme', [$this, 'themeSetup']);
        add_filter('block_editor_settings', [$this, 'removeDefaultEditorStyles']);
        add_filter('block_editor_settings', [$this, 'configureEditorSettings']);
        remove_action('wp_head', 'gutenberg_maybe_inline_styles', 1);
        add_action('wp_head', [$this, 'registerBlockStyles'], 0);
        add_action('wp_head', [$this, 'inlineCriticalStyles'], 1);
    }

    public function themeSetup(): void
    {
        add_theme_support('align-wide');
        add_theme_support('editor-styles');
        add_theme_support('wp-block-styles');
        // add_theme_support('disable-custom-colors');
        add_theme_support('disable-custom-font-sizes');
        add_theme_support('disable-custom-gradients');
        add_theme_support('disable-custom-line-height');

        add_theme_support('editor-gradient-presets', []);
        add_theme_support('experimental-custom-spacing');
        add_theme_support('experimental-link-color');
        add_theme_support('custom-units');

        add_theme_support('editor-color-palette', config('theme.editor-color-palette'));
        add_theme_support('editor-font-sizes', config('theme.editor-font-sizes'));
        add_theme_support('editor-gradient-presets', config('theme.editor-gradient-presets'));

        remove_theme_support('block-templates');

        add_filter('load_separate_block_assets', '__return_true');

        // Remove core block patterns.
        // remove_theme_support('core-block-patterns');
    }

    /**
     * Swap out the core block stylesheets with the ones in our theme
     * but add core as it's dependency so it loads before.
     */
    public function registerBlockStyles(): void
    {
        $manifest = $this->app['config']->get('assets.manifests.theme.manifest');
        if (!$manifest || !file_exists($manifest)) {
            return;
        }

        collect(json_decode(file_get_contents($manifest)))
            ->keys()
            ->filter(function ($item) {
                return Str::startsWith($item, '/styles/blocks');
            })
            ->each(function ($style) {
                global $wp_styles;
                $block = basename($style, '.css');
                $coreHandle = "wp-block-$block";
                $newCoreHandle = "wp-block-$block-original";

                $coreDependency = $wp_styles->registered[$coreHandle] ?? null;
                if (!$coreDependency) {
                    return;
                }

                wp_deregister_style($coreDependency->handle);
                wp_register_style(
                    $newCoreHandle,
                    $coreDependency->src,
                    $coreDependency->deps,
                    $coreDependency->ver,
                );
                wp_style_add_data($newCoreHandle, 'path', $coreDependency->extra['path']);

                wp_register_style(
                    $coreHandle,
                    asset($style)->uri(),
                    [$coreDependency->handle . '-original'],
                    null
                );
                wp_style_add_data($coreHandle, 'path', asset($style)->path());
            });
    }

    /**
     * Enqueue and inline
     */
    public function inlineCriticalStyles(): void
    {
        if (is_singular()) {
            $post = get_post();
            $blocks = parse_blocks($post->post_content);

            $walker = function (array $carry, array $block) use (&$walker): array {
                if (count($carry) > 10) {
                    return $carry;
                }
                if ($block['blockName']) {
                    $carry[] = $block['blockName'];
                }
                if ($block['innerBlocks']) {
                    $carry = array_reduce($block['innerBlocks'], $walker, $carry);
                }
                return $carry;
            };

            $blockNames = array_reduce($blocks, $walker, []);
            collect($blockNames)
                ->unique()
                ->map(function ($blockName) {
                    return 'wp-block-' . Str::after($blockName, '/');
                })
                ->each(function ($handle) {
                    $this->doInlineStyle($handle);
                    wp_enqueue_style($handle);
                });
        }
    }

    protected function doInlineStyle(string $handle): void
    {
        global $wp_styles;
        $path = wp_styles()->get_data($handle, 'path');
        if ($path && file_exists($path)) {
            $wp_styles->registered[$handle]->src = false;
            $wp_styles->registered[$handle]->extra['after'][] = file_get_contents($path);
            foreach ($wp_styles->registered[$handle]->deps as $dependency) {
                $this->doInlineStyle($dependency);
            }
        }
    }

    public function removeDefaultEditorStyles(array $settings): array
    {

        // editor-styles.css
        array_shift($settings['styles']);
        // Nato Serif definition
        array_shift($settings['styles']);
        return $settings;
    }

    public function configureEditorSettings(array $settings): array
    {
        // Disable Drop Cap feature on paragraph blocks.
        $settings['__experimentalDisableDropCap'] = true;

        return $settings;
    }
}
