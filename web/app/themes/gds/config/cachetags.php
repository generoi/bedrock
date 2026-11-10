<?php

use Genero\Sage\CacheTags\Actions\Core;
use Genero\Sage\CacheTags\Actions\DebugComment;
use Genero\Sage\CacheTags\Actions\HttpHeader;
use Genero\Sage\CacheTags\Actions\Nonce;
use Genero\Sage\CacheTags\Invalidators\CloudflareCacheInvalidator;
use Genero\Sage\CacheTags\Invalidators\FastlySoftCacheInvalidator;
use Genero\Sage\CacheTags\Invalidators\KinstaGroupCacheInvalidator;
use Genero\Sage\CacheTags\Util;

// Each cache layer is purged where it exists. Kinsta hosts staging and
// production; its mu-plugin also loads locally, where its purge endpoint does
// not, so the environment decides. A CDN in front is on once its API
// credentials are in the environment (see .env.example).
$kinsta = in_array(wp_get_environment_type(), ['staging', 'production'], true);
$fastly = Util::env('FASTLY_SERVICE_ID') && Util::env('FASTLY_API_KEY');
$cloudflare = Util::env('CLOUDFLARE_API_TOKEN') && Util::env('CLOUDFLARE_ZONE_IDS');

return [
    // Tags are sent only to a CDN that purges by them. Kinsta purges by URL.
    'http-header' => array_filter([
        'Surrogate-Key' => $fastly ? ' ' : null,
        'Cache-Tag' => $cloudflare ? ',' : null,
    ]),
    'invalidator' => array_filter([
        $kinsta ? KinstaGroupCacheInvalidator::class : null,
        // Soft purge: Fastly serves stale while it revalidates.
        $fastly ? FastlySoftCacheInvalidator::class : null,
        // CloudflareSoftCacheInvalidator needs a Cloudflare-CDN-Cache-Control
        // header without s-maxage before it can serve stale; until then purge.
        $cloudflare ? CloudflareCacheInvalidator::class : null,
    ]),
    'action' => [
        Core::class,
        DebugComment::class,
        HttpHeader::class,
        // Purges pages tagged 'nonce' twice a day, so a cached page never
        // serves an expired nonce.
        Nonce::class,

        // Added automatically while their plugin is active ('auto-detect-actions'),
        // so listing them changes nothing: cart, checkout and account stay
        // uncached, purges follow translations, prepopulated forms are skipped.
        // \Genero\Sage\CacheTags\Actions\WooCommerce::class,
        // \Genero\Sage\CacheTags\Actions\Polylang::class,
        // \Genero\Sage\CacheTags\Actions\Gravityform::class,

        // Opt in where a site needs them:
        // Multisite: prefix tags per site so sites can't purge each other.
        // \Genero\Sage\CacheTags\Actions\Site::class,
        // Tag REST API reads, for headless or JS-rendered content.
        // \Genero\Sage\CacheTags\Actions\RestApi::class,
        // Tag every post and term a query fetches, instead of per template or block.
        // \Genero\Sage\CacheTags\Actions\AutoTag::class,
        // Serve cached pages to logged-in customers when no markup is per user.
        // \Genero\Sage\CacheTags\Actions\CacheCustomers::class,
    ],
];
