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

        add_theme_support('experimental-custom-spacing');
        add_theme_support('experimental-link-color');
        add_theme_support('custom-units');

        add_theme_support('editor-color-palette', config('theme.editor-color-palette'));
        add_theme_support('editor-font-sizes', config('theme.editor-font-sizes'));
        add_theme_support('editor-gradient-presets', config('theme.editor-gradient-presets'));

        // Requires Gutenberg plugin
        // remove_theme_support('block-templates');
        // add_filter('load_separate_block_assets', '__return_true');

        // Remove core block patterns.
        // remove_theme_support('core-block-patterns');
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
