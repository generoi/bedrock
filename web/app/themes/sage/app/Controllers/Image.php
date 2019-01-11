<?php

/**
 * @file
 * Contains App\Controllers\Image class used as an extension of
 * TimberExtended\Image.
 */

namespace App\Controllers;

use Timber;
use TimberExtended;

class Image extends TimberExtended\Image
{
    /** @inheritdoc */
    public $tojpg = true;
}
