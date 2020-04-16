<?php
/*
Plugin Name:  Register Post Types
Plugin URI:   https://genero.fi
Description:  Register Post Types and Taxonomies for site
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use PostTypes\PostType;
use PostTypes\Taxonomy;

if (!is_blog_installed()) {
    return;
}

/**
 * Register custom post types and taxonomies with WP.
 *
 * @see https://github.com/jjgrainger/PostTypes
 * @see https://developer.wordpress.org/resource/dashicons/
 */
class PostTypes
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

    public function __construct()
    {
        add_action('plugins_loaded', [$this, 'register'], 9);
        add_action('admin_head', [$this, 'adminHead']);
    }

    /**
     * Register all post types and their taxonomies.
     * @note needs to run during `init`.
     */
    public function register()
    {
        $this->postTypes[] = $this->registerPost();
        $this->postTypes[] = $this->registerPage();
        // $this->postTypes[] = $this->registerProduct();
        // $this->postTypes[] = $this->registerPerson();
    }

    public function registerPost()
    {
        $post = new PostType('post');
        $post->register();

        // Set `has_archive` for compatibility with `post-type-archive-mapping`.
        add_filter('register_post_type_args', function ($args, $post_type) {
            if ($post_type === 'post') {
                $args['has_archive'] = true;
                $args['rewrite'] = [
                    'with_front' => true,
                ];
            }
            return $args;
        }, 10, 2);

        return $post;
    }

    public function registerPage()
    {
        $page = new PostType('page');
        $page->register();

        add_action('init', function () {
            add_post_type_support('page', 'excerpt');
        });

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
            'show_in_rest' => true,
            'supports' => ['title', 'thumbnail'],
        ]);
        $person->icon('dashicons-admin-users');
        $person->taxonomy('department');
        $person->columns()
            ->add(['thumbnail' => ''])
            ->order(['thumbnail' => 1])
            ->populate('thumbnail', function ($column, $post_id) {
                echo get_the_post_thumbnail($post_id, 'thumbnail');
            });
        $person->register();

        $department = new Taxonomy('department');
        $department->register();

        return $person;
    }

    public function adminHead()
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

PostTypes::getInstance();
