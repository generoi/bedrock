<?php

namespace App\Blocks;

use WP_Query;
use App\Blocks\ArticleList;

class CarouselList extends ArticleList
{
    public function with()
    {
        return [
            'query' => $this->query(),
            'swiper' => [
                'autoplay' => false,
                'loop' => false,
                'slidesPerView' => 1,
                'spaceBetween' => 24,
                'simulateTouch' => true,
                'autoHeight' => false,
                'centeredSlides' => true,
                'pagination' => [
                    'el' => '.swiper-pagination',
                    'type' => 'bullets',
                    'clickable' => true,
                ],
                'navigation' => [
                    'prevEl' => '.swiper-button-prev',
                    'nextEl' => '.swiper-button-next',
                ],
                'breakpoints' => [
                    '782' => [
                        'slidesPerView' => 'auto',
                        'spaceBetween' => 24,
                    ]
                ]
            ]
        ];
    }
}
