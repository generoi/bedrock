<?php

namespace App\blocks;

use Exception;
use Illuminate\Contracts\View\View;
use StoutLogic\AcfBuilder\FieldsBuilder;
use WP_Block;

abstract class Block
{
    /**
     * Block name from the block.json in the format `namespace`/`block-name`.
     */
    protected string $name;

    public function __construct()
    {
        $this->name = $this->blockName();

        $this->registerBlock();
        $this->registerFields();
    }

    /**
     * Block slug which resolves to the block classname in the format `Block`.
     */
    protected function slug(): string
    {
        return (new \ReflectionClass($this))->getShortName();
    }

    /**
     * Get the block name from the block.json.
     */
    protected function blockName(): string
    {
        $block = json_decode(file_get_contents(
            $this->blockJson()
        ));
        return $block->name;
    }

    /**
     * Register the block type.
     */
    protected function registerBlock()
    {
        register_block_type($this->blockJson(), [
            'render_callback' => [$this, 'render'],
        ]);
    }

    /**
     * Get the absolute path to the block.json file of the block.
     */
    protected function blockJson(): string
    {
        $json = asset(sprintf("blocks/%s/block.json", $this->slug()));
        if (! $json->exists()) {
            throw new Exception(sprintf("block.json file does not exists: %s", $json->path()));
        }
        return $json->path();
    }

    /**
     * Return a resolved blade view using the arguments passed. Equal to calling
     * `Roots\view(blocks::<slug>.<slug>, [...$args])`.
     *
     */
    protected function view(...$args): View
    {
        $bladeFile = sprintf(
            'blocks::%s.%s',
            self::slug(),
            _wp_to_kebab_case(self::slug()),
        );
        return view($bladeFile, ...$args);
    }

    /**
     * Echo out the contents of the block.
     */
    public abstract function render(
        array $attributes,
        string $content = '',
        $isPreview = false,
        int $postId = 0,
        ?WP_Block $block = null,
        array|bool $context = false
    ): void;

    /**
     * Optionally return a FieldsBuilder instance which gets registerd for the
     * block.
     */
    protected function fields(): ?FieldsBuilder
    {
        return null;
    }

    /**
     * Register ACF fields for the block.
     */
    protected function registerFields(): void
    {
        if (!function_exists('acf_add_local_field_group')) {
            return;
        }
        if ($fields = $this->fields()) {
            $fields->setLocation('block', '==', $this->name);
            acf_add_local_field_group($fields->build());
        }
    }

}

