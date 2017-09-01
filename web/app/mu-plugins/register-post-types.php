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

namespace Genero\Client;

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
        // $this->postTypes[] = $this->registerCase();
    }

    /**
     * A case Post Type
     *
     * @return PostType
     */
    public function registerCase()
    {
        $case = new PostType('case');
        $case->taxonomy('client');
        $case->columns()->hide(['date', 'author']);
        $case->icon('dashicons-clipboard');

        return $case;
    }
}

CustomPostTypes::getInstance()->init();
