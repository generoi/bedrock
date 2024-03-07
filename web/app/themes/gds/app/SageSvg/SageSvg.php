<?php

namespace App\SageSvg;

use Illuminate\Support\HtmlString;
use Log1x\SageSvg\SageSvg as BaseSageSvg;

class SageSvg extends BaseSageSvg
{
    /**
     * {@inheritDoc}
     */
    public function render($image, $class = '', $attrs = [])
    {
        if (empty($attrs['title'])) {
            return parent::render(...func_get_args());
        }

        $title = $attrs['title'];
        $titleId = uniqid('svg_');
        $attrs['role'] = 'img';
        $attrs['aria-labelledby'] = $titleId;
        unset($attrs['title']);

        $svg = preg_replace(
            '/(<svg[^>]+>)/',
            sprintf('$1<title id="%s">%s</title>', $titleId, $title),
            parent::render($image, $class, $attrs)
        );
        return new HtmlString($svg);
    }
}
