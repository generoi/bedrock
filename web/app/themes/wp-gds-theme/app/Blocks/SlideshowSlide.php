<?php

namespace App\Blocks;

use Genero\Sage\NativeBlock\NativeBlock;

class SlideshowSlide extends NativeBlock
{
    public $name = 'gds/slideshow-slide';

    public function with()
    {
        return (array) $this->attributes;
    }
}
