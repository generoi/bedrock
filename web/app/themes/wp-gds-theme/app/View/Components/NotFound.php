<?php

namespace App\View\Components;

use Roots\Acorn\View\Component;

class NotFound extends Component
{
    /**
     * Create the component instance.
     */
    public function __construct(
        public ?string $header = null,
        public ?string $search = null,
        public ?string $title = null,
        public ?string $searchLabel = null,
        public ?string $description = null,
    ) {
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return $this->view('components.not-found');
    }
}
