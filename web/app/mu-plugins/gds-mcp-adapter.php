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

// mcp-adapter 0.5+ expects meta.mcp.uri / meta.mcp.mimeType / meta.mcp.annotations.
// generoi/gds-mcp still uses top-level meta keys; without this, default server creation fails and no tools list.
add_filter('wp_register_ability_args', function (array $args, string $name): array {
    if (! isset($args['meta']) || ! is_array($args['meta'])) {
        return $args;
    }

    $meta = &$args['meta'];

    if (! isset($meta['mcp']) || ! is_array($meta['mcp'])) {
        $meta['mcp'] = [];
    }

    foreach (['uri', 'mimeType'] as $legacyKey) {
        if (isset($meta[$legacyKey]) && ! isset($meta['mcp'][$legacyKey])) {
            $meta['mcp'][$legacyKey] = $meta[$legacyKey];
            unset($meta[$legacyKey]);
        }
    }

    if (isset($meta['annotations']) && ! isset($meta['mcp']['annotations'])) {
        $meta['mcp']['annotations'] = $meta['annotations'];
        unset($meta['annotations']);
    }

    return $args;
}, 5, 2);

add_filter('wp_register_ability_args', function (array $args, string $name): array {
    // Expose all gds/ and core/ abilities as public MCP tools.
    if (str_starts_with($name, 'gds/') || str_starts_with($name, 'core/')) {
        if (! isset($args['meta']) || ! is_array($args['meta'])) {
            $args['meta'] = [];
        }
        if (! isset($args['meta']['mcp']) || ! is_array($args['meta']['mcp'])) {
            $args['meta']['mcp'] = [];
        }
        $args['meta']['mcp']['public'] = true;
    }

    // Fix missing 'type' on execute-ability output schema (adapter bug).
    if ($name === 'mcp-adapter/execute-ability') {
        $args['output_schema']['properties']['data']['type'] = ['object', 'array', 'string', 'number', 'boolean', 'null'];
    }

    return $args;
}, 10, 2);
