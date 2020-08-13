<?php

namespace Genero\Sage\NativeBlock;

use Illuminate\Support\Str;
use Roots\Acorn\Application;

class NativeBlock
{
    protected $app;
    protected $attributeDefinitions = [];

    public $name;
    public $attributes;
    public $classes;
    public $content;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function compose()
    {
        add_action('init', function () {
            $slug = Str::after($this->name, '/');
            $path = $this->app->resourcePath("assets/scripts/editor/blocks/$slug/block.json");

            if (file_exists($path)) {
                $this->registerFromMetadata($path);
            } else {
                $this->register();
            }
        });
    }

    protected function register(): void
    {
        register_block_type($this->name, $this->build());
    }

    protected function registerFromMetadata($path): void
    {
        register_block_type_from_metadata(
            dirname($path),
            $this->build()
        );

        $json = json_decode(file_get_contents($path));

        $this->attributeDefinitions = $json->attributes;
    }

    public function build()
    {
        return [
            'render_callback' => function ($attributes, $content) {
                return $this->render($attributes, $content);
            }
        ];
    }

    public function render($attributes, $content)
    {
        $this->attributes = (object) array_merge($this->metaAttributes(), $attributes);
        $this->content = $content;
        $this->className = Str::start(Str::slug(Str::replaceFirst('/', '-', $this->name), '-'), 'wp-block-');
        $this->classes = collect([
            'slug' => $this->className,
            'align' => !empty($this->attributes->align) ? Str::start($this->attributes->align, 'align') : false,
            'color' => !empty($this->attributes->textColor) ? "has-{$this->attributes->textColor}-color has-text-color" : false,
            'background' => !empty($this->attributes->backgroundColor) ? "has-{$this->attributes->backgroundColor}-background-color has-background" : false,
            'classes' => $this->attributes->className ?? false,
        ])->filter()->implode(' ');

        return $this->view(
            Str::finish('views.blocks.', Str::after($this->name, '/')),
            [
                'block' => $this,
                'content' => $this->content,
            ]
        );
    }

    public function metaAttributes()
    {
        $attributes = [];
        foreach ($this->attributeDefinitions as $name => $definition) {
            if (!isset($definition->source) || $definition->source !== 'meta') {
                continue;
            }

            $attributes[$name] = get_registered_metadata('post', get_the_ID(), $name);
        }

        return $attributes;
    }

    public function with()
    {
        return [];
    }

    public function view($view, $with = [])
    {
        $view = $this->app->resourcePath(
            Str::finish(
                str_replace('.', '/', basename($view, '.blade.php')),
                '.blade.php'
            )
        );

        if (!file_exists($view)) {
            return;
        }

        return $this->app->make('view')->file(
            $view,
            array_merge($with, $this->with())
        )->render();
    }
}
