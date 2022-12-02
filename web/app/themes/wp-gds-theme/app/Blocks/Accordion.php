<?php

namespace App\Blocks;

use Genero\Sage\NativeBlock\NativeBlock;

class Accordion extends NativeBlock
{
    public $name = 'gds/accordion';

    public function with()
    {
        return array_merge((array) $this->attributes, []);
    }
}
