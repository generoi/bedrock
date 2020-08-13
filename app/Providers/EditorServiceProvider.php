<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Roots\Acorn\ServiceProvider;
use WP_Block_Type_Registry;
use WP_Query;

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

        add_theme_support('editor-gradient-presets', []);
        // add_theme_support('experimental-custom-spacing');
        // add_theme_support('experimental-link-color');

        add_theme_support('editor-color-palette', [
            [
                'name'  => __('White', 'gds'),
                'slug'  => 'white',
                'color' => '#fff',
            ],
            [
                'name'  => __('Light gray', 'gds'),
                'slug'  => 'ui-background-01',
                'color' => '#eee',
            ],
            [
                'name'  => __('Light gray 50%', 'gds'), // @todo style guide has outdated value
                'slug'  => 'ui-background-02',
                'color' => 'rgb(238 238 238 / 50%)',
            ],
            [
                'name'  => __('Medium gray', 'gds'),
                'slug'  => 'ui-01',
                'color' => '#acacac',
            ],
            [
                'name'  => __('Dark gray', 'gds'),
                'slug'  => 'ui-02',
                'color' => '#646464',
            ],
            [
                'name'  => __('Black', 'gds'),
                'slug'  => 'black',
                'color' => '#000000',
            ],
            [
                'name'  => __('Green', 'gds'),
                'slug'  => 'ui-03',
                'color' => '#00a06e',
            ],
            [
                'name'  => __('Blue', 'gds'),
                'slug'  => 'ui-04',
                'color' => '#00a3b7',
            ],
            [
                'name'  => __('Red', 'gds'),
                'slug'  => 'ui-05',
                'color' => '#f1615e',
            ],
            [
                'name'  => __('Pink', 'gds'),
                'slug'  => 'ui-06',
                'color' => '#ffdcdd',
            ],
            [
                'name'  => __('Purple', 'gds'),
                'slug'  => 'ui-07',
                'color' => '#9185db',
            ],
        ]);

        add_theme_support('editor-font-sizes', [
            [
                'name' => __('S paragraph', 'gds'),
                'slug' => 's-paragraph',
                'size' => 15,
            ],
            [
                'name' => __('M paragraph', 'gds'),
                'slug' => 'm-paragraph',
                'size' => 17,
            ],
            [
                'name' => __('L paragraph', 'gds'),
                'slug' => 'l-paragraph',
                'size' => 20,
            ],
            [
                'name' => __('Light heading', 'gds'),
                'slug' => 'light-heading',
                'size' => 19,
            ],
            [
                'name' => __('Heavy heading', 'gds'),
                'slug' => 'heavy-heading',
                'size' => 62,
            ],
            [
                'name' => __('S heading', 'gds'),
                'slug' => 's-heading',
                'size' => 20,
            ],
            [
                'name' => __('M heading', 'gds'),
                'slug' => 'm-heading',
                'size' => 28,
            ],
            [
                'name' => __('L heading', 'gds'),
                'slug' => 'l-heading',
                'size' => 36,
            ],
            [
                'name' => __('XL heading', 'gds'),
                'slug' => 'xl-heading',
                'size' => 60,
            ],
            [
                'name' => __('XXL heading', 'gds'),
                'slug' => 'xxl-heading',
                'size' => 72,
            ],
        ]);
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
