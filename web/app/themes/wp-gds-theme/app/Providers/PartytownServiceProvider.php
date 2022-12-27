<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PartytownServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_action('wp_head', [$this, 'addPartytown'], 0);
    }

    public function addPartytown(): void
    {
        $config = config('partytown.config');
        $loader = asset('~partytown/' . (WP_DEBUG ? 'debug/' : '' ) . 'partytown.js')->contents();
        ?>
        <script>
        window.partytown = <?php echo json_encode($config); ?>;
        window.partytown.resolveUrl = function(url) {
          var proxyMap = {
            'connect.facebook.net': 'facebook.generodigital.com',
          }
          url.hostname = proxyMap[url.hostname] || url.hostname;
          return url;
        }
        </script>
        <script><?php echo $loader; ?></script>
        <?php
    }
}
