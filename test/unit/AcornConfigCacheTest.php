<?php

use Roots\Acorn\Bootstrap\LoadConfiguration;

/**
 * `acorn optimize` bakes one config cache from a single WP-CLI boot, and every
 * site on the install reads it. The boot file binds an override of Acorn's
 * LoadConfiguration that re-reads the config files after a cached boot, so
 * per-site values don't freeze, and keeps the cached provider list, which is
 * the only place a cached boot gets the withProviders() providers from.
 *
 * This bakes a real cache with one value wrong and an extra provider, then
 * boots the bound bootstrapper from it.
 */
class AcornConfigCacheTest extends WP_UnitTestCase
{
    private $config;

    private string $cache;

    public function set_up(): void
    {
        parent::set_up();
        $this->config = \app('config');
        $this->cache = sys_get_temp_dir().'/acorn-config-cache-test-'.getmypid().'.php';
    }

    public function tear_down(): void
    {
        @unlink($this->cache);
        putenv('APP_CONFIG_CACHE');
        unset($_ENV['APP_CONFIG_CACHE'], $_SERVER['APP_CONFIG_CACHE']);
        \app()->instance('config', $this->config);
        parent::tear_down();
    }

    public function test_a_cached_boot_rereads_the_files_and_keeps_the_providers()
    {
        $file = glob(\app()->configPath('*.php'))[0];
        $key = basename($file, '.php');
        $provider = 'Tests\\FromWithProviders';

        $stale = ['stale-from-another-site' => true];
        $cached = config()->all();
        $cached[$key] = $stale;
        $cached['app']['providers'] = [...(array) ($cached['app']['providers'] ?? []), $provider];
        file_put_contents($this->cache, '<?php return '.var_export($cached, true).';');
        putenv("APP_CONFIG_CACHE={$this->cache}");
        $_ENV['APP_CONFIG_CACHE'] = $_SERVER['APP_CONFIG_CACHE'] = $this->cache;

        \app()->make(LoadConfiguration::class)->bootstrap(\app());

        $this->assertTrue(\app()->configurationIsCached(), 'The test cache was not picked up.');
        // Acorn may merge its own defaults into a config, so compare what the
        // file sets rather than the whole array.
        $this->assertNotSame(
            $stale,
            config($key),
            'A cached boot must re-read the config files: the boot file has to bind '
            .'the LoadConfiguration override, or one site\'s cache freezes the rest.'
        );
        foreach (require $file as $option => $value) {
            $this->assertSame($value, config("{$key}.{$option}"), "{$key}.{$option} must come from its file.");
        }
        $this->assertContains(
            $provider,
            config('app.providers'),
            'The override must keep the cached provider list, or a cached boot drops '
            .'the providers passed to withProviders().'
        );
    }
}
