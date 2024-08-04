<?php

class ThemeTest extends WP_UnitTestCase
{
    public function testThemeBoots()
    {
        $this->assertTrue(
            \app()->providerIsLoaded(\App\Providers\SageServiceProvider::class),
            'Sage provider is loaded'
        );

        do_action('wp_enqueue_scripts');
        $this->assertTrue(
            wp_script_is('sage/app.js'),
            'app.js is enqueued'
        );
    }
}
