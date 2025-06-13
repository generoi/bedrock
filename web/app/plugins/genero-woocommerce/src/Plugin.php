<?php

namespace GeneroWoo\Woocommerce;

use App\Providers\BlockServiceProvider;

use function Roots\asset;
use function Roots\bundle;

class Plugin
{
    public const MANIFEST = 'genero-woocommerce.assets.manifest';

    protected static $instance;

    public readonly string $file;

    public readonly string $path;

    public readonly string $url;

    protected BlockServiceProvider $blockServiceProvider;

    protected WooCommerce $woocommerce;

    public static function getInstance(): static
    {
        if (! isset(self::$instance)) {
            self::$instance = new static;
        }

        return self::$instance;
    }

    public function __construct()
    {
        $this->file = realpath(__DIR__.'/../genero-woocommerce.php');
        $this->path = untrailingslashit(plugin_dir_path($this->file));
        $this->url = untrailingslashit(plugin_dir_url($this->file));
        $this->blockServiceProvider = new BlockServiceProvider(app());
        $this->woocommerce = new WooCommerce;

        add_action('init', [$this, 'registerApp'], 9);
        add_action('init', [$this, 'registerAssets']);
        add_filter('plugins_url', [$this, 'filterBlockAssetUri'], 10, 3);
        add_action('enqueue_block_editor_assets', [$this, 'registerBlockEditorAssets'], 100);
        add_action('wp_enqueue_scripts', [$this, 'enqueueBlockStyles']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockStyles']);
        add_action('plugins_loaded', [$this->woocommerce, 'init']);
    }

    public function registerApp()
    {
        app('assets')->manifest(self::MANIFEST, [
            'path' => $this->path.'/public',
            'url' => $this->url.'/public',
            'assets' => $this->path.'/public/manifest.json',
            'bundles' => $this->path.'/public/entrypoints.json',
        ]);

        app('view')->addNamespace('genero-woocommerce', $this->path.'/resources/views');
        app('view')->addNamespace('genero-woocommerce-blocks', $this->path.'/resources/blocks');
        $this->blockServiceProvider->registerBlocks($this->path.'/resources/blocks');
    }

    public function registerAssets(): void
    {
        wp_register_style(
            'genero-woocommerce/woocommerce.css',
            asset('styles/app.css', self::MANIFEST),
        );

        wp_register_script(
            'genero-woocommerce/woocommerce.js',
            asset('scripts/app.js', self::MANIFEST),
        );
        wp_add_inline_script('genero-woocommerce/woocommerce.js', asset('runtime.js', self::MANIFEST)->contents(), 'before');
    }

    public function registerBlockEditorAssets(): void
    {
        if ($bundle = bundle('scripts/editor', self::MANIFEST)) {
            wp_enqueue_script('genero-woocommerce/editor.js', asset('scripts/editor.js', self::MANIFEST)->uri(), $bundle->dependencies(), null, true);
            wp_add_inline_script('genero-woocommerce/editor.js', asset('runtime.js', self::MANIFEST)->contents(), 'before');
        }
    }

    public function filterBlockAssetUri(string $url, string $path, string $plugin): string
    {
        $distPath = $this->path.'/public/';
        if (str_starts_with($plugin, $distPath.'blocks/')) {
            $relativePath = mb_substr($plugin, strlen($distPath));

            return asset($relativePath, self::MANIFEST)->uri();
        }

        return $url;
    }

    public function enqueueBlockStyles(): void
    {
        $manifestPath = $this->path.'/public/manifest.json';
        $this->blockServiceProvider->enqueueBlockStyles($manifestPath, self::MANIFEST, 'genero-woocommerce');
    }
}
