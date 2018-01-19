<?php
/*
Plugin Name:  Site: Register Post Types
Plugin URI:   https://genero.fi
Description:  Register Post Types and Taxonomies for site
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use PostTypes\PostType;

if (!is_blog_installed()) {
    return;
}

/**
 * Register custom post types and taxonomies with WP.
 *
 * @see https://github.com/jjgrainger/PostTypes
 * @see https://developer.wordpress.org/resource/dashicons/
 */
class CustomPostTypes
{
    private static $instance = null;

    /** @var array */
    public $postTypes = [];

    public static function getInstance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Register all post types and their taxonomies.
     */
    public function init()
    {
        $this->postTypes[] = $this->registerPost();
        $this->postTypes[] = $this->registerPage();
        // $this->postTypes[] = $this->registerProduct();
        // $this->postTypes[] = $this->registerPerson();

        add_action('admin_head', [$this, 'admin_head']);
    }

    public function registerPost()
    {
        $post = new PostType('post');
        $post->register();

        return $post;
    }

    public function registerPage()
    {
        $page = new PostType('page');
        $page->register();

        return $page;
    }

    public function registerProduct()
    {
        $product = new PostType('product');
        $product->register();

        return $product;
    }

    public function registerPerson()
    {
        $person = new PostType('person', [
            'has_archive' => false,
            'supports' => ['title', 'thumbnail'],
        ]);
        $person->icon('dashicons-admin-users');
        $person->taxonomy('department');
        $person->columns()
            ->add(['thumbnail' => ''])
            ->order(['thumbnail' => 1])
            ->populate('thumbnail', function($column, $post_id) {
                echo get_the_post_thumbnail($post_id, 'thumbnail');
            });
        $person->register();

        $department = new Taxonomy('department');
        $department->register();

        return $person;
    }

    public function admin_head()
    {
        echo '<style>
            .wp-list-table th.column-thumbnail { width: 28px; }
            .wp-list-table td.column-thumbnail img {
                max-width: 37px;
                max-height: 37px;
                width: auto;
                height: auto;
            }
        </style>';
    }
}

CustomPostTypes::getInstance()->init();
