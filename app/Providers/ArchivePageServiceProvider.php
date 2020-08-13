<?php

namespace App\Providers;

use Roots\Acorn\ServiceProvider;
use WP_Query;

use function Roots\view;

class ArchivePageServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_filter('template_include', [$this, 'templateInclude']);
    }

    public function templateInclude(string $template): string
    {
        global $wp_query;
        if ($postType = $wp_query->get('original_archive_id')) {
            $this->setupArchiveGlobals($postType);

            return $this->getArchivePageTemplate($postType);
        }
        return $template;
    }

    protected function setupArchiveGlobals(string $postType): void
    {
        global $wp_query, $post;
        $original_wp_query = $wp_query;

        $wp_query = new WP_Query([
            'post_type' => $postType,
            'paged' => get_query_var('paged') ?: 1,
        ]);
        $wp_query->queried_object_id = $original_wp_query->queried_object_id;
        $wp_query->queried_object = $original_wp_query->queried_object;
        $post = $wp_query->queried_object;
    }

    protected function getArchivePageTemplate(string $postType): string
    {
        if ($postType === 'post') {
            return get_home_template();
        }

        $templates[] = "archive-{$postType}.php";
        $templates[] = 'archive.php';
        $template = get_query_template('archive', $templates);

        if (!$template) {
            $template = get_index_template();
        }
        return $template;
    }
}
