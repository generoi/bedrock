<?php

namespace App\Blocks;

use Genero\Sage\NativeBlock\NativeBlock;

class AccordionItem extends NativeBlock
{
    public $name = 'gds/accordion-item';

    public function with()
    {
        return array_merge((array) $this->attributes, []);
    }
}
