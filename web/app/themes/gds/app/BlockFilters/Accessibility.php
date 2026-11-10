<?php

namespace App\BlockFilters;

use WP_HTML_Tag_Processor;

class Accessibility
{
    public function __construct()
    {
        add_filter('render_block_core/separator', [$this, 'renderSeparator']);
        add_filter('render_block_core/site-logo', [$this, 'renderSiteLogo']);
        add_filter('safe_svg_inline_markup', [$this, 'renderSafeSvgInlineMarkup']);
    }

    /**
     * Add role="home" and aria-label to site logo.
     */
    public function renderSiteLogo(string $content): string
    {
        $processor = new WP_HTML_Tag_Processor($content);
        if ($processor->next_tag('a')) {
            $processor->set_attribute('rel', 'home');
            $processor->set_attribute(
                'aria-label',
                /* translators: %s is replaced with the name of the site */
                sprintf(__('%s frontpage', 'gds'), get_bloginfo('name', 'display'))
            );
        }
        if ($processor->next_tag('img')) {
            $processor->set_attribute('aria-hidden', 'true');
            $processor->set_attribute('alt', '');
        }

        return $processor->get_updated_html();
    }

    /**
     * Separators should be decorative.
     */
    public function renderSeparator(string $content): string
    {
        return str_replace('<hr ', '<hr aria-hidden="true" ', $content);
    }

    /**
     * Fix accessibility issues with inlined SVGs.
     */
    public function renderSafeSvgInlineMarkup(string $markup): string
    {
        $processor = new WP_HTML_Tag_Processor($markup);
        $processor->next_tag('svg');

        // SVGs should be images so their content isnt read out
        if (! $processor->get_attribute('role')) {
            $processor->set_attribute('role', 'img');
        }

        if (! str_contains($markup, '<title')) {
            $processor->set_attribute('aria-hidden', 'true');
        }

        return $processor->get_updated_html();
    }
}
