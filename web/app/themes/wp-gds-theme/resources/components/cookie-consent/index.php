<?php

namespace components\cookie_consent;

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('sage/cookie-consent.css', asset('components/cookie-consent/index.css')->uri(), [], null);
    wp_style_add_data('sage/cookie-consent.css', 'async', true);
});

add_action('wp_body_open', function () {
    echo view('components::cookie-consent.cookie-consent');
});
