<?php

namespace App\Cli;

use Symfony\Component\VarExporter\VarExporter;
use WP_CLI;

class ExportTemplateCli
{
    public function export(array $args): void
    {
        $postId = $args[0] ?? null;
        if (! $postId) {
            WP_CLI::error('Post ID is required');
        }

        $post = get_post($postId);
        if (! $post) {
            WP_CLI::error(sprintf('Post not found: %s', $postId));
        }

        $postType = $post->post_type;
        $templateFile = app()->resourcePath("templates/{$postType}.php");

        wp_mkdir_p(dirname($templateFile));
        file_put_contents($templateFile, $this->templateArray($post->post_content));
        WP_CLI::success(sprintf('Template exported for %s (ID: %d)', $postType, $postId));
    }

    protected function templateArray(string $content): string
    {
        $blocks = parse_blocks($content);

        // Clean and format blocks for template array
        $template = array_map([$this, 'cleanBlock'], $blocks);
        $template = array_filter($template, [$this, 'isValidBlock']);

        // Reindex arrays to remove explicit numeric keys
        $template = array_values($template);

        // Use VarExporter for cleaner output without explicit numeric indexes
        $export = VarExporter::export($template);

        return sprintf("<?php\n\nreturn %s;\n", $export);
    }

    /**
     * Clean a single block for template use.
     * WordPress template format: [blockName, attrs, innerBlocks]
     * For blocks with text content (buttons, paragraphs, lists), extract innerContent into attrs['content']
     */
    protected function cleanBlock(array $block): array
    {
        $blockName = $block['blockName'] ?? null;
        $attrs = $block['attrs'] ?? [];

        // Extract text content from innerContent for specific block types
        if ($this->shouldExtractContent($blockName) && ! empty($block['innerContent'])) {
            $textContent = $this->extractTextContent($block['innerContent']);
            if ($textContent !== '') {
                // For paragraphs, use content as placeholder (strip HTML tags)
                if (in_array($blockName, ['core/paragraph'], true)) {
                    $plainText = wp_strip_all_tags($textContent);
                    if ($plainText !== '') {
                        $attrs['placeholder'] = $plainText;
                    }
                } elseif (in_array($blockName, ['core/button', 'core/accordion-heading'], true)) {
                    // Button and accordion-heading blocks use 'text' attribute, not 'content'
                    $attrs['text'] = wp_strip_all_tags($textContent);
                } else {
                    $attrs['content'] = wp_strip_all_tags($textContent);
                }
            }
        }

        // For paragraphs, remove content if it exists (we use placeholder instead)
        if (in_array($blockName, ['core/paragraph'], true)) {
            unset($attrs['content']);
        }

        // Remove cover image URL and ID references, and skip inner blocks
        if ($blockName === 'core/cover') {
            unset($attrs['url'], $attrs['id']);

            // Build the template array structure without innerBlocks
            return [$blockName, $attrs];
        }

        // Remove inner blocks from core/accordion blocks
        if ($blockName === 'core/accordion') {
            unset($attrs['content']);

            // Build the template array structure without innerBlocks
            return [$blockName, $attrs];
        }

        // Build the template array structure: [blockName, attrs, innerBlocks?]
        $cleaned = [$blockName, $attrs];

        // Only include innerBlocks if they exist
        if (! empty($block['innerBlocks'])) {
            $innerBlocks = array_map([$this, 'cleanBlock'], $block['innerBlocks']);
            $innerBlocks = array_filter($innerBlocks, [$this, 'isValidBlock']);
            $innerBlocks = array_values($innerBlocks);

            if (! empty($innerBlocks)) {
                $cleaned[] = $innerBlocks;
            }
        }

        return $cleaned;
    }

    /**
     * Check if a block type should have its innerContent extracted to content attribute.
     */
    protected function shouldExtractContent(?string $blockName): bool
    {
        if (empty($blockName)) {
            return false;
        }

        // Blocks that use content attribute for text
        $contentBlocks = [
            'core/button',
            'core/paragraph',
            'core/heading',
            'core/accordion-heading',
            'core/list',
            'core/list-item',
        ];

        return in_array($blockName, $contentBlocks, true);
    }

    /**
     * Extract text content from innerContent array.
     * Returns concatenated text strings, ignoring null placeholders.
     */
    protected function extractTextContent(array $innerContent): string
    {
        $text = '';
        foreach ($innerContent as $item) {
            if (is_string($item)) {
                $trimmed = trim($item);
                if ($trimmed !== '') {
                    $text .= $trimmed;
                }
            }
        }

        return $text;
    }

    /**
     * Check if a block is valid for template (not empty/null blocks).
     * Block format is now [blockName, attrs, innerBlocks?]
     */
    protected function isValidBlock(array $block): bool
    {
        // Block should be an array with at least blockName at index 0
        if (empty($block) || ! is_array($block)) {
            return false;
        }

        $blockName = $block[0] ?? null;

        // Keep blocks with a blockName
        if (! empty($blockName)) {
            return true;
        }

        // Keep blocks with innerBlocks (at index 2)
        if (isset($block[2]) && ! empty($block[2])) {
            return true;
        }

        return false;
    }
}
