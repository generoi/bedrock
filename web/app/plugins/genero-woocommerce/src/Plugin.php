<?php

namespace GeneroWoo\Woocommerce;

use App\Providers\BlockServiceProvider;

class Plugin
{
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

        // After WooCommerce sets product args; still before `init` finishes registration.
        add_filter('register_post_type_args', [$this->woocommerce, 'registerProductBlockTemplate'], 1000, 2);

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
        app('view')->addNamespace('genero-woocommerce', $this->path.'/resources/views');
        app('view')->addNamespace('genero-woocommerce-blocks', $this->path.'/resources/blocks');
        $this->blockServiceProvider->registerBlocks($this->path.'/resources/blocks');
    }

    public function registerAssets(): void
    {
        $css = $this->asset('app-styles.css');
        wp_register_style(
            'genero-woocommerce/woocommerce.css',
            $css->uri(),
            [],
            $css->version(),
        );
    }

    public function registerBlockEditorAssets(): void
    {
        $editor = $this->asset('editor.js');
        wp_enqueue_script('genero-woocommerce/editor.js', $editor->uri(), $editor->dependencies(), $editor->version(), true);
    }

    public function filterBlockAssetUri(string $url, string $path, string $plugin): string
    {
        $buildPath = $this->path.'/build/';
        // Scripts are versioned by core from .asset.php; block.json styles are not.
        if (! str_starts_with($plugin, $buildPath.'blocks/') || str_ends_with($plugin, '.js')) {
            return $url;
        }

        $version = $this->asset(mb_substr($plugin, strlen($buildPath)))->version();

        return $version ? add_query_arg('v', $version, $url) : $url;
    }

    public function enqueueBlockStyles(): void
    {
        static $manifest = null;

        if ($manifest === null) {
            $manifestPath = $this->path.'/build/manifest.json';
            $manifest = file_exists($manifestPath)
                ? json_decode(file_get_contents($manifestPath), true) ?: []
                : [];
        }

        collect($manifest)
            ->keys()
            ->filter(fn ($file) => str_starts_with($file, 'block-styles/'))
            ->filter(fn ($file) => str_ends_with($file, '.css'))
            ->map(fn ($file) => $this->asset($file))
            ->each(function (object $asset): void {
                $filename = pathinfo(basename($asset->path()), PATHINFO_FILENAME);
                $separator = str_contains($filename, '--') ? '--' : '-';
                [$collection, $blockName] = explode($separator, $filename, 2);
                $handle = "genero-woocommerce/block/$filename";
                $version = $asset->version();

                wp_register_style($handle, $asset->uri(), [], $version);
                wp_style_add_data($handle, 'path', $asset->path());

                wp_enqueue_block_style("$collection/$blockName", [
                    'handle' => $handle,
                    'src' => $asset->uri(),
                    'path' => $asset->path(),
                    'ver' => $version,
                ]);
            });
    }

    public function asset(string $path): object
    {
        static $manifest = null;

        if ($manifest === null) {
            $manifestPath = $this->path.'/build/manifest.json';
            $manifest = file_exists($manifestPath)
                ? json_decode(file_get_contents($manifestPath), true) ?: []
                : [];
        }

        $buildUrl = $this->url.'/build/';
        $buildPath = $this->path.'/build/';

        return new class($path, $buildUrl, $buildPath, $manifest)
        {
            public function __construct(
                private readonly string $assetPath,
                private readonly string $buildUrl,
                private readonly string $buildPath,
                private readonly array $manifestData,
            ) {}

            public function uri(): string
            {
                return $this->buildUrl.$this->assetPath;
            }

            public function path(): string
            {
                return $this->buildPath.$this->assetPath;
            }

            public function version(): string
            {
                return $this->manifestData[$this->assetPath]['hash']
                    ?? (file_exists($this->path()) ? (string) filemtime($this->path()) : '');
            }

            public function dependencies(): array
            {
                $deps = $this->manifestData[$this->assetPath]['dependencies'] ?? null;
                if ($deps !== null) {
                    return $deps;
                }

                $assetFile = preg_replace('/\.js$/', '.asset.php', $this->path());

                return file_exists($assetFile) ? (require $assetFile)['dependencies'] ?? [] : [];
            }
        };
    }
}
