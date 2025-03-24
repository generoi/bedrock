<?php

namespace GeneroWoo\Woocommerce;

use function Roots\asset;
use function Roots\bundle;

class Plugin
{
    public const MANIFEST = 'genero-woocommerce.assets.manifest';

    protected static $instance;

    protected string $file;

    protected string $path;

    protected string $url;

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

        add_action('init', [$this, 'registerApp'], 9);
        add_action('init', [$this, 'registerAssets']);
        add_action('enqueue_block_editor_assets', [$this, 'registerBlockEditorAssets'], 100);

        new WooCommerce;
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
        // (new BlockServiceProvider(app()))->registerBlocks($this->path.'/resources/blocks');
    }

    public function registerAssets(): void
    {
        wp_register_style(
            'genero-woocommerce/app.css',
            asset('app.css', self::MANIFEST),
        );
    }

    public function registerBlockEditorAssets(): void
    {

    }
}
