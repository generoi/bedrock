<?php

namespace App\Blocks;

use Genero\Sage\NativeBlock\NativeBlock;

class Slideshow extends NativeBlock
{
    public $name = 'gds/slideshow';

    public function with()
    {
        return array_merge((array) $this->attributes, [
            'swiper' => $this->swiper(),
        ]);
    }

    public function swiper(): array
    {
        return [
            'autoplay' => $this->attributes->isAutoplay,
            'loop' => $this->attributes->isLoop,
            'slidesPerView' => 1,
            'simulateTouch' => true,
            'autoHeight' => true,
            // 'cssMode' => true,
            'pagination' => [
                'el' => '.swiper-pagination',
                'type' => 'bullets',
                'clickable' => true,
            ],
            'navigation' => [
                'prevEl' => $this->attributes->hasNavigation ? '.swiper-button-prev' : null,
                'nextEl' => $this->attributes->hasNavigation ? '.swiper-button-next' : null,
            ],
        ];
    }
}
