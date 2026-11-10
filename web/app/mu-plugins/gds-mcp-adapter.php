<?php

/*
Plugin Name:  GDS MCP Adapter
Plugin URI:   https://genero.fi
Description:  Bootstrap WordPress MCP Adapter and expose core abilities
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

use WP\MCP\Core\McpAdapter;

if (! defined('ABSPATH') || ! class_exists(McpAdapter::class)) {
    return;
}

McpAdapter::instance();

add_filter('wp_register_ability_args', function (array $args, string $name): array {
    // Expose all gds/ and core/ abilities as public MCP tools.
    if (str_starts_with($name, 'gds/') || str_starts_with($name, 'core/')) {
        $args['meta']['mcp']['public'] = true;
    }

    // Fix missing 'type' on execute-ability output schema (adapter bug).
    if ($name === 'mcp-adapter/execute-ability') {
        $args['output_schema']['properties']['data']['type'] = ['object', 'array', 'string', 'number', 'boolean', 'null'];
    }

    return $args;
}, 10, 2);
