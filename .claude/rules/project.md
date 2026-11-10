# Project-Specific Rules

## Custom Post Types

<!-- List post types registered for this project, e.g.:
- `recipe` — registered in `web/app/plugins/wp-recipes/`
- `product` — registered in `web/app/plugins/gds-products/`
-->

## Theme Notes

<!-- Project-specific theme conventions, non-standard patterns, etc. -->

- Product pages render the block template `web/app/themes/gds/templates/single-product.html`, not Blade; every other page is Blade. Products open in the editor in template mode: the layout is the template (edit it once, for all products), the product's content is only its description. The wiring and a temporary Acorn workaround are in `app/filters.php`.

## Integrations

<!-- Notable third-party integrations and their config locations, e.g.:
- ACF: field groups in `web/app/themes/{namespace}/app/Fields/`
- Polylang: multilingual — use `__('string', 'textdomain')` for all strings
- Yoast: SEO fields registered in post type plugins
-->

## Known Issues / Gotchas

<!-- Document project-specific quirks here -->
