<?php

namespace App;

class Assets
{
    /** @var array<string, array> Parsed manifests keyed by scope. */
    private static array $manifests = [];

    /**
     * Read the build manifest for a scope.
     *
     * The 'child' scope must read the child theme's own manifest: parent and
     * child both emit an `app-styles.css` and an `app.js`, so resolving a child
     * asset against the parent manifest returns the parent's hash and the
     * child's assets stop cache-busting when only the child is rebuilt.
     */
    private static function manifest(?string $scope = null): array
    {
        $scope ??= 'theme';

        if (! isset(self::$manifests[$scope])) {
            $manifestPath = $scope === 'child'
                ? get_stylesheet_directory().'/build/manifest.json'
                : get_parent_theme_file_path('build/manifest.json');

            self::$manifests[$scope] = file_exists($manifestPath)
                ? json_decode(file_get_contents($manifestPath), true) ?: []
                : [];
        }

        return self::$manifests[$scope];
    }

    public static function asset(string $path, ?string $manifest = null): object
    {
        $manifestData = self::manifest($manifest);

        return new class($path, $manifest, $manifestData)
        {
            public function __construct(
                private readonly string $assetPath,
                private readonly ?string $manifest = null,
                private readonly array $manifestData = [],
            ) {}

            public function uri(): string
            {
                $buildPath = 'build/'.$this->assetPath;

                $baseUri = match ($this->manifest) {
                    'child' => get_stylesheet_directory_uri().'/'.$buildPath,
                    default => get_parent_theme_file_uri($buildPath),
                };

                // Auto-append ?v= for images and SVGs (not handled by wp_enqueue_*)
                if (preg_match('#^(images|svgs)/#', $this->assetPath)) {
                    $hash = $this->manifestData[$this->assetPath]['hash'] ?? null;

                    if ($hash) {
                        return add_query_arg('v', $hash, $baseUri);
                    }
                }

                return $baseUri;
            }

            public function path(): string
            {
                $buildPath = 'build/'.$this->assetPath;

                return match ($this->manifest) {
                    'child' => get_stylesheet_directory().'/'.$buildPath,
                    default => get_parent_theme_file_path($buildPath),
                };
            }

            public function version(): string
            {
                $hash = $this->manifestData[$this->assetPath]['hash'] ?? null;

                if ($hash) {
                    return $hash;
                }

                $path = $this->path();

                return file_exists($path) ? (string) filemtime($path) : '';
            }

            public function dependencies(): array
            {
                $deps = $this->manifestData[$this->assetPath]['dependencies'] ?? null;

                if ($deps !== null) {
                    return $deps;
                }

                $assetFile = preg_replace('/\.js$/', '.asset.php', $this->path());

                if (! file_exists($assetFile)) {
                    return [];
                }

                return (require $assetFile)['dependencies'] ?? [];
            }
        };
    }
}
