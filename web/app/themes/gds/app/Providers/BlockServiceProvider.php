<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
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
}
