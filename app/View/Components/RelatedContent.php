<?php

namespace App\View\Components;

use Roots\Acorn\View\Component;
use WP_Query;

class RelatedContent extends Component
{
    public $type;
    public $label;
    public $query;

    /**
     * Create the component instance.
     */
    public function __construct(
        string $type = 'article',
        string $label = null,
        WP_Query $query = null
    ) {
        $this->type = $type;
        $this->label = $label;
        $this->query = $query;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return $this->view('components.related-content');
    }
}
