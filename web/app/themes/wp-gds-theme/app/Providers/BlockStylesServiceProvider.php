<?php

namespace App\Providers;

use App\BlockStyles;
use Illuminate\Support\Str;
use Roots\Acorn\ServiceProvider;

class BlockStylesServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('block.styles', BlockStyles::class);
        $this->attachBladeDirective();
    }

    public function boot()
    {
        add_action('wp_head', [$this, 'registerThemeBlockStyles'], 0);
        add_action('wp_head', [$this, 'gatherPageBlockStyles'], 1);
    }

    /**
     * Attach a blade directives: @block() and @enqueue_block_style().
     */
    public function attachBladeDirective(): void
    {
        $blade = $this->app['view']->getEngineResolver()->resolve('blade')->getCompiler();

        $blade->directive('block', function ($expression) {
            $expression = collect(explode(',', $expression, 2))
                ->map(function ($argument) {
                    return trim($argument);
                });

            $blockName = $expression->get(0);
            $attributes = $expression->get(1);
            return "<?php Roots\app('block.styles')->enqueueBlockStyle($blockName); ?>"
                . "<?php echo render_block(['blockName' => {$blockName}, 'attrs' => {$attributes}]); ?>";
        });

        $blade->directive('enqueue_block_style', function ($blockName) {
            return "<?php Roots\app('block.styles')->printBlockStyle($blockName); ?>";
        });
    }

    /**
     * Register all the theme block stylesheets.
     */
    public function registerThemeBlockStyles(): void
    {
        foreach ($this->themeBlockStyles() as $style) {
            $this->app['block.styles']->registerStyle($style);
        }
    }

    /**
     * Gather and enqueue all the block stylesheets used in the post.
     */
    public function gatherPageBlockStyles(): void
    {
        if (!is_singular()) {
            return;
        }

        collect($this->app['block.styles']->getPostBlocks(get_post()))
            ->each(function ($block) {
                $this->app['block.styles']->enqueueBlockStyle($block);
            });
    }

    /**
     * Get all the block stylesheets in the manifest file. Block stylesheets
     * are located in /dist/styles/blocks directory.
     */
    protected function themeBlockStyles(): array
    {
        $manifest = $this->app['config']->get('assets.manifests.theme.manifest');
        if (!$manifest || !file_exists($manifest)) {
            return [];
        }

        $assets = json_decode(file_get_contents($manifest));

        return collect($assets)
            ->keys()
            ->filter(function ($item) {
                return Str::startsWith($item, '/styles/blocks');
            })
            ->all();
    }
}
