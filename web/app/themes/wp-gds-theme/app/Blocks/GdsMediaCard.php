<?php

namespace App\Blocks;

use Genero\Sage\NativeBlock\NativeBlock;

class GdsMediaCard extends NativeBlock
{
    public $name = 'gds/media-card';

    public function with()
    {
        return array_merge((array) $this->attributes, [
            'mediaStyle' => $this->mediaStyle(),
        ]);
    }

    public function mediaStyle(): string
    {
        if (empty($this->attributes->focalPoint)) {
            return 'object-position: 50% 50%';
        }

        return sprintf(
            "object-position: %s%% %s%%;",
            round($this->attributes->focalPoint['x'] * 100, 3),
            round($this->attributes->focalPoint['y'] * 100, 3)
        );
    }
}
