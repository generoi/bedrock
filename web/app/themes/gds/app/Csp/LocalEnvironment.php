<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class LocalEnvironment implements Preset
{
    public function configure(Policy $policy): void
    {
        // DDEV redirects /app/uploads/* to production
        // (.ddev/nginx/redirect-uploads.conf), and CSP checks the redirect
        // target too.
        if (getenv('IS_DDEV_PROJECT')) {
            $policy->add([Directive::IMG, Directive::MEDIA], ['gdsbedrock.kinsta.cloud']);
        }
    }
}
