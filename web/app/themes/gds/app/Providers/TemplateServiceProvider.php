<?php

namespace App\Providers;

use App\Cli\ExportTemplateCli;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\Finder\Finder;
use WP_CLI;

/**
 * Post type block templates: resources/templates/{post-type}.php returns the
 * template array a new post of that type starts from. Export one from an
 * existing post with `wp gds export-template export <post-id>`.
 */
class TemplateServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_action('init', [$this, 'setPostTypeTemplates']);
    }

    public function setPostTypeTemplates(): void
    {
        $path = $this->app->resourcePath('templates');

        if (! is_dir($path)) {
            return;
        }

        foreach ((new Finder)->in([$path])->files() as $filepath) {
            $postType = pathinfo($filepath, PATHINFO_FILENAME);

            if ($postTypeObject = get_post_type_object($postType)) {
                $postTypeObject->template = (include $filepath);
            }
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (defined('WP_CLI') && WP_CLI) {
            WP_CLI::add_command('gds export-template', ExportTemplateCli::class);
        }
    }
}
