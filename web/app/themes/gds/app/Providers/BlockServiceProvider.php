<?php

namespace App\Providers;

use App\Assets;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\Finder\Finder;
use WP_Block_Supports;
use WP_Block_Type;
use WP_Block_Type_Registry;

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
        add_action('init', [$this, 'registerBlockStyles']);
        add_action('init', [$this, 'registerBlockSupports']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueBlockStyles'], 10, 0);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockStyles'], 10, 0);
        add_filter('theme_file_uri', [$this, 'filterBlockAssetUri'], 10, 2);
    }

    public function registerBlocks(?string $blocksDir = null)
    {
        if (! $blocksDir) {
            $blocksDir = $this->app->resourcePath('blocks');
        }

        if (! is_dir($blocksDir)) {
            return;
        }

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
    public function boot()
    {
        // Resolve the view service during boot, not register — the `view`
        // binding is not available until all providers have registered.
        $this->attachBladeDirective();
        $this->addViewNamespace();
    }

    public function registerBlockStyles(): void
    {
        register_block_style('core/list', [
            'name' => 'spacious',
            'label' => __('Spacious', 'gds'),
        ]);
        register_block_style('core/columns', [
            'name' => 'media-text',
            'label' => __('Media & Text', 'gds'),
        ]);
        register_block_style('core/post-title', [
            'name' => 'underline',
            'label' => __('Underline', 'gds'),
        ]);
    }

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

    public function enqueueBlockStyles(?string $manifestPath = null, ?string $manifest = null, ?string $namespace = 'sage'): void
    {
        // @see https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/
        $manifestPath = $manifestPath ?? get_parent_theme_file_path('build/manifest.json');

        if (! file_exists($manifestPath)) {
            return;
        }

        collect(json_decode(file_get_contents($manifestPath), true))
            ->keys()
            ->filter(fn ($file) => str_starts_with($file, 'block-styles/'))
            ->filter(fn ($file) => str_ends_with($file, '.css'))
            ->map(fn ($file) => Assets::asset($file, $manifest))
            ->each(function (object $asset) use ($namespace) {
                $filename = pathinfo(basename($asset->path()), PATHINFO_FILENAME);
                // In case a block collection uses dashes, you can use -- to
                // separate the collection and the block name.
                [$collection, $blockName] = explode(str_contains($filename, '--') ? '--' : '-', $filename, 2);
                $blockName = strtok($blockName, '.');
                $handle = "$namespace/block/$filename";
                $version = $asset->version();

                // Register the handles early so we can enqueue them even without the block
                wp_register_style($handle, $asset->uri(), [], $version);
                wp_style_add_data($handle, 'path', $asset->path());

                wp_enqueue_block_style("$collection/$blockName", [
                    'handle' => $handle,
                    'src' => $asset->uri(),
                    'path' => $asset->path(),
                    'ver' => $version,
                ]);

                // wp_enqueue_block_style hooks the handle behind a
                // render_block filter — it never appears in the block type's
                // style_handles array, so pre-enqueue paths (e.g.
                // PerformanceServiceProvider) can't discover it via the
                // registry. Mirror it onto style_handles so the registry
                // stays the single source of truth.
                $type = WP_Block_Type_Registry::get_instance()->get_registered("$collection/$blockName");
                if ($type && ! in_array($handle, (array) $type->style_handles, true)) {
                    $type->style_handles[] = $handle;
                }
            });
    }

    /**
     * Fix cache bursting of block assets in the editor.
     */
    public function filterBlockAssetUri(string $url, string $file): string
    {
        if (! str_starts_with($file, 'build/')) {
            return $url;
        }

        // Scripts already carry a version: core reads it from the .asset.php
        // that wp-scripts emits beside each entry and appends its own ?ver=.
        // Adding ?v= on top emitted both -- script.js?v=494824a5&ver=32dc134a...
        //
        // Stylesheets are deliberately not excluded. block.json's `style` has no
        // sibling .asset.php, so core appends nothing and this filter is the
        // only thing cache-busting them; skipping .css here would ship
        // style-index.css with no version at all.
        if (str_ends_with($file, '.js')) {
            return $url;
        }

        $assetPath = substr($file, strlen('build/'));
        $version = Assets::asset($assetPath)->version();

        return $version ? add_query_arg('v', $version, $url) : $url;
    }
}
