<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Roots\Acorn\Assets\Contracts\Asset;
use Symfony\Component\Finder\Finder;
use WP_Block_Supports;
use WP_Block_Type;

class BlockServiceProvider extends ServiceProvider
{
    protected bool $isRunning = false;

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_action('init', [$this, 'registerBlocks']);
        add_action('init', [$this, 'registerBlockSupports']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueBlockStyles']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockStyles']);

        add_action('wp_head', [$this, 'fixInlineStylesRelativeLinks'], 2);
        add_action('wp_footer', [$this, 'fixInlineStylesRelativeLinks'], 2);

        $this->attachBladeDirective();
        $this->addViewNamespace();
    }

    public function registerBlocks()
    {
        $blocksDir = $this->app->resourcePath('blocks');

        foreach ((new Finder)->in($blocksDir)->name('*.php') as $block) {
            $blockDefinitions = [
                'index.php',
                // block-name.php
                basename($block->getPath()).'.php',
            ];

            if (! in_array($block->getFilename(), $blockDefinitions)) {
                continue;
            }

            include_once $block->getRealPath();
        }
    }

    public function addViewNamespace()
    {
        $this->app->make('view')->addNamespace('blocks', $this->app->resourcePath('blocks'));
    }

    /**
     * Add a blade directive for rendering blocks with custom attributes
     *
     * @example
     *
     * @block('gds/article-list', [
     *   'align' => 'wide',
     * ])
     */
    public function attachBladeDirective()
    {
        $blade = $this->app->make('view')->getEngineResolver()->resolve('blade')->getCompiler();
        $blade->directive('blocks', fn () => '<?php ob_start(); ?>');
        $blade->directive('endblocks', fn () => '<?php echo do_blocks(ob_get_clean()); ?>');

        $blade->directive('block', function ($expression) {
            $expression = collect(explode(',', $expression, 2))
                ->map(function ($argument) {
                    return trim($argument);
                });

            return "
                <?php echo render_block([
                    'blockName' => {$expression->get(0)},
                    'attrs' => array_merge(
                        ['name' => {$expression->get(0)}],
                        {$expression->get(1)}
                    ),
                ]); ?>
            ";
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {}

    public function registerBlockSupports(): void
    {
        WP_Block_Supports::get_instance()->register('default_wrapper_attributes', [
            'apply' => [$this, 'applyDefaultAttributesToWrapperOutput'],
        ]);
    }

    /**
     * When you set register a block and set default values for attributes (eg.
     * alignwide), they are not considered when genering the attributes HTML
     * with `get_block_wrapper_attributes()`.
     *
     * @see https://github.com/WordPress/gutenberg/issues/7342
     * @see https://github.com/WordPress/gutenberg/issues/38830
     */
    public function applyDefaultAttributesToWrapperOutput(WP_Block_Type $blockType): array
    {
        // Prevent recursive calls
        if ($this->isRunning ?? false) {
            return [];
        }

        $originalAttributes = WP_Block_Supports::$block_to_render['attrs'] ?? [];

        $defaultAttributes = collect($blockType->attributes)
            ->filter(fn ($definition, $key) => ! isset($originalAttributes[$key]))
            ->filter(fn ($definition) => ! empty($definition['default']))
            ->map(fn ($definition) => $definition['default'])
            ->all();

        if (empty($defaultAttributes)) {
            return [];
        }

        $this->isRunning = true;

        // Temporarily replace the detected HTML comment block attributes with
        // the ones declared as default when register the block so that we can
        // render the classes.
        WP_Block_Supports::$block_to_render['attrs'] = $defaultAttributes;
        $output = WP_Block_Supports::get_instance()->apply_block_supports($blockType->blockName);
        WP_Block_Supports::$block_to_render['attrs'] = $originalAttributes;

        $this->isRunning = false;

        return $output;
    }

    public function enqueueBlockStyles(): void
    {
        // @see https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/
        $manifest = config('assets.manifests.theme.assets');
        collect(json_decode(file_get_contents($manifest), true))
            ->keys()
            ->filter(fn ($file) => str_starts_with($file, 'styles/blocks/'))
            ->filter(fn ($file) => str_ends_with($file, '.css'))
            ->map(fn ($file) => asset($file))
            ->each(function (Asset $asset) {
                $filename = pathinfo(basename($asset->path()), PATHINFO_FILENAME);
                [$collection, $blockName] = explode('-', $filename, 2);
                $blockName = strtok($blockName, '.');
                $handle = "sage/block/$filename";

                // Register the handles early so we can enqueue them even without the block
                wp_register_style($handle, $asset->uri());
                wp_style_add_data($handle, 'path', $asset->path());

                wp_enqueue_block_style("$collection/$blockName", [
                    'handle' => $handle,
                    'src' => $asset->uri(),
                    'path' => $asset->path(),
                ]);
            });
    }

    /**
     * Fix issue where WordPress incorrectly appends the theme path to absolute
     * urls (beginning with /) referenced in the css.
     *
     * @see wp_maybe_inline_styles()
     * @see _wp_normalize_relative_css_links()
     */
    public function fixInlineStylesRelativeLinks(): void
    {
        /** @var WP_Styles $wp_styles */
        global $wp_styles;

        $themePath = get_stylesheet_directory();
        $themeUri = get_stylesheet_directory_uri();

        foreach ($wp_styles->registered as $handle => $style) {
            if (empty($style->extra['after']) || empty($style->extra['path'])) {
                continue;
            }
            // Stylesheet absolute directory path
            $styleDir = dirname($style->extra['path']);

            // Only act on styles in the theme.
            if (! str_starts_with($styleDir, $themePath)) {
                continue;
            }

            // Process all inline styles
            foreach ($style->extra['after'] as $idx => $css) {
                // /var/www/html/web/app/themes/gds/public/blocks/post-teaser -> public/blocks/post-teaser
                $styleDirRelativeToTheme = str_replace($themePath, '', $styleDir);
                // -> https://gdsbedrock.ddev.site/app/themes/gds/public/blocks/post-teaser
                $styleUri = $themeUri.$styleDirRelativeToTheme;
                // -> /app/themes/gds/public/blocks/post-teaser
                $styleRelativeUri = wp_make_link_relative($styleUri);

                // Remove the theme path which WordPress adds in
                // `_wp_normalize_relative_css_links()` if the asset had an
                // absolute path beginning with a /
                $style->extra['after'][$idx] = str_replace($styleRelativeUri.'//', '/', $css);
            }
        }
    }
}
