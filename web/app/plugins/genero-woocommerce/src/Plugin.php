<?php

namespace GeneroWoo\Woocommerce;

class Plugin
{
    protected static $instance;

    protected string $file;

    protected string $path;

    protected string $url;

    public static function getInstance(): static
    {
        if (! isset(self::$instance)) {
            self::$instance = new static;
        }

        return self::$instance;
    }

    public function __construct()
    {
        $this->file = realpath(__DIR__.'/../genero-woocommerce.php');
        $this->path = untrailingslashit(plugin_dir_path($this->file));
        $this->url = untrailingslashit(plugin_dir_url($this->file));

        new WooCommerce;
    }
}
