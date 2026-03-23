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

use PostTypes\Columns;
use PostTypes\PostType;
use PostTypes\Taxonomy;

if (! is_blog_installed()) {
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
        if (self::$instance === null) {
            self::$instance = new self;
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
     *
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
        $post = new class extends PostType
        {
            public function name(): string
            {
                return 'post';
            }

            public function options(): array
            {
                return [
                    'rewrite' => [
                        'with_front' => true,
                    ],
                ];
            }
        };
        $post->register();

        return $post;
    }

    public function registerPage()
    {
        $page = new class extends PostType
        {
            public function name(): string
            {
                return 'page';
            }

            public function hooks(): void
            {
                add_action('init', function () {
                    add_post_type_support('page', 'excerpt');
                });
            }
        };
        $page->register();

        return $page;
    }

    public function registerProduct()
    {
        $product = new class extends PostType
        {
            public function name(): string
            {
                return 'product';
            }
        };
        $product->register();

        return $product;
    }

    public function registerPerson()
    {
        $person = new class extends PostType
        {
            public function name(): string
            {
                return 'person';
            }

            public function options(): array
            {
                return [
                    'has_archive' => false,
                    'show_in_rest' => true,
                    'supports' => ['title', 'thumbnail'],
                ];
            }

            public function icon(): ?string
            {
                return 'dashicons-admin-users';
            }

            public function taxonomies(): array
            {
                return ['department'];
            }

            public function columns(Columns $columns): Columns
            {
                $columns->add('thumbnail')
                    ->label('')
                    ->before('title')
                    ->populate(function ($postId) {
                        echo get_the_post_thumbnail($postId, 'thumbnail');
                    });

                return $columns;
            }
        };
        $person->register();

        $department = new class extends Taxonomy
        {
            public function name(): string
            {
                return 'department';
            }

            public function posttypes(): array
            {
                return ['person'];
            }
        };
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
