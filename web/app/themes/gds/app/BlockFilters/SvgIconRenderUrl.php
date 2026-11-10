<?php

namespace App\BlockFilters;

class SvgIconRenderUrl
{
    public function __construct()
    {
        add_filter('render_block_safe-svg/svg-icon', [$this, 'render'], 10, 2);
    }

    /**
     * Safe SVG's icon block renders nothing for an SVG given by a relative
     * URL (no attachment ID); inline the file when it is in the uploads.
     */
    public function render(string $content, array $block): string
    {
        if (! empty($block['attrs']['imageID'])) {
            return $content;
        }

        $url = $block['attrs']['svgURL'] ?? null;
        if (empty($url)) {
            return $content;
        }

        // Only process relative URLs (not http:// or https://)
        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $content;
        }

        $filePath = $this->resolveFilePath($url);
        if (! $filePath) {
            return $content;
        }

        $svgContent = file_get_contents($filePath);
        if ($svgContent === false) {
            return $content;
        }

        return sprintf(
            '<div class="wp-block-safe-svg-svg-icon safe-svg-cover">
                <div class="safe-svg-inside">%s</div>
            </div>',
            $svgContent
        );
    }

    protected function resolveFilePath(string $url): ?string
    {
        $relativePath = ltrim($url, '/');

        $filePath = trailingslashit(dirname(WP_CONTENT_DIR)).$relativePath;
        if (! file_exists($filePath)) {
            return null;
        }

        $uploadDir = wp_upload_dir();
        $uploadsBasePath = wp_normalize_path($uploadDir['basedir']);
        $normalizedFilePath = wp_normalize_path(realpath($filePath));
        if (! $normalizedFilePath || ! str_starts_with($normalizedFilePath, $uploadsBasePath)) {
            return null;
        }

        return $filePath;
    }
}
