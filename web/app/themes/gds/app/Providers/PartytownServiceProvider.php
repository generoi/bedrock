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
        if (! $this->isEnabled()) {
            return;
        }

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
            'snap.licdn.com': 'snaplicdncom.generodigital.com',
            'googleads.g.doubleclick.net': 'googleadsdoubleclick.generodigital.com',
            'sc.lfeeder.com': 'sclfeedercom.generodigital.com',
            'amplify.outbrain.com': 'amplifyoutbraincom.generodigital.com',
            'tr.outbrain.com': 'troutbraincom.generodigital.com',
          }
          if (url.hostname === 'www.googletagmanager.com' && url.pathname.startsWith('/debug')) {
            proxyMap[url.hostname] = 'googletagmanager.generodigital.com';
          }

          url.hostname = proxyMap[url.hostname] || url.hostname;
          return url;
        }
        </script>
        <script><?php echo $loader; ?></script>
        <?php
    }

    public function config(): ?array
    {
        $config = config('partytown.config');
        if (!$config || config('partytown.disabled')) {
            return null;
        }
        return $config;
    }

    public function isEnabled(): bool
    {
        if (! $this->config()) {
            return false;
        }
        // @see https://github.com/BuilderIO/partytown/issues/72
        if (isset($_REQUEST['nopartytown']) || isset($_REQUEST['gtm_debug'])) {
            return false;
        }
        return true;
    }
}
