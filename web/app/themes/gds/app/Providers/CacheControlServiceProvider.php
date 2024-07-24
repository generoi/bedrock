<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use WP_REST_Response;

class CacheControlServiceProvider extends ServiceProvider
{
    protected array $privateRestEndpoints = [
        '/wc/store/v1/cart',
    ];

    public function register()
    {
        add_action('send_headers', [$this, 'sendHeaders'], PHP_INT_MAX);
        add_filter('rest_post_dispatch', [$this, 'restPostDispatch']);
    }

    /**
     * Regular page response headers
     */
    public function sendHeaders(): void
    {
        if ($this->hasCacheControlHeader(headers_list())) {
            return;
        }

        // Exit unless we're responding to a GET request
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            return;
        }

        if ($roles = $this->getCurrentUserRoles()) {
            header(sprintf('X-WP-User-Roles: %s', implode(', ', $roles)));
            header('Vary: X-WP-User-Roles, Accept-Encoding', true);
        }

        if (is_admin_bar_showing() || is_admin()) {
            nocache_headers();
            return;
        }

        if ($_REQUEST['add-to-cart'] ?? null) {
            nocache_headers();
            return;
        }

        if ($_REQUEST['show-reset-form'] ?? null) {
            nocache_headers();
            return;
        }


        // Cache 404s for 1h
        if (is_404()) {
            header(sprintf(
                'Cache-Control: %s',
                $this->buildCacheControlHeader(sharedMaxAge: HOUR_IN_SECONDS)
            ));
            return;
        }

        header(sprintf(
            'Cache-Control: %s',
            $this->buildCacheControlHeader(sharedMaxAge: WEEK_IN_SECONDS)
        ));
    }

    /**
     * REST API response headers
     */
    public function restPostDispatch(WP_REST_Response $response): WP_REST_Response
    {
        if (is_user_logged_in()) {
            return $response;
        }

        $headers = $response->get_headers();
        if ($this->hasCacheControlHeader($headers)) {
            return $response;
        }

        // For now we default to caching all endpoints for logged out users
        // except this blacklist
        if (in_array($response->get_matched_route(), $this->privateRestEndpoints)) {
            $headers['Cache-Control'] = 'no-cache, must-revalidate, max-age=0';
        } else {
            $headers['Cache-Control'] = $this->buildCacheControlHeader(sharedMaxAge: HOUR_IN_SECONDS);
        }

        $response->set_headers($headers);
        return $response;
    }

    protected function getCurrentUserRoles(): array
    {
        return collect(is_user_logged_in() ? wp_get_current_user()->roles : ['anonymous'])
            ->values()
            ->sort()
            ->all();
    }

    protected function hasCacheControlHeader(array $headers): bool
    {
        foreach ($headers as $header => $value) {
            // Map
            if (is_string($header)) {
                if (strtolower($header) === 'cache-control') {
                    return true;
                }
            // Sequential
            } else {
                if (str_starts_with('cache-control:', strtolower($value))) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @param string $type Cache Control type. Defaults to public
     * @param int $maxAge Browser cache. Defaults to 0, do not store
     * @param int $sharedMaxAge Shared proxy caches. Defaults to 1 week
     * @param int $staleWhileRevlidate Serve stale content while revalidating. Defaults to 1 month
     * @param int $staleIfError Serve stale content if error. Defaults to 1 month
     */
    protected function buildCacheControlHeader(
        string $type = 'public',
        int $maxAge = MINUTE_IN_SECONDS,
        int $sharedMaxAge = WEEK_IN_SECONDS,
        int $staleWhileRevalidate = MONTH_IN_SECONDS,
        int $staleIfError = MONTH_IN_SECONDS,
    ): string {
        return sprintf(
            '%s, max-age=%s, s-maxage=%s, stale-while-revalidate=%s, stale-if-error=%s',
            $type,
            $maxAge,
            $sharedMaxAge,
            $staleWhileRevalidate,
            $staleIfError,
        );
    }
}
