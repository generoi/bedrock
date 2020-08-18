<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;
use stdClass;
use WP_Query;

class ContentSingle extends Composer
{
    use HasPost;

    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.content-single',
    ];

    /**
     * @return array
     */
    public function with()
    {
        $post = get_post();

        return [
            'label' => $this->label($post),
            'categories' => $this->categories($post),

        ];
    }
}
