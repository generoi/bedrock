<?php

namespace App\Blocks;

use WP_Query;
use App\Blocks\CarouselList;

class PostCarousel extends CarouselList
{
    public $name = 'Post Carousel';
    public $description = 'Show a carousel of posts...';
    public $postType = 'post';
}
