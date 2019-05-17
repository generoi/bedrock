<?php
/*
Plugin Name:  Wonolog
Plugin URI:   https://genero.fi
Description:  Enable Wonolog
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use Inpsyde\Wonolog;
use Monolog\Handler;
use Monolog\Logger;

if (!is_blog_installed()) {
    return;
}

if (defined('WONOLOG_LOG_DIR') && defined('WONOLOG_ENABLED') && WONOLOG_ENABLED) {
    if (!is_dir(WONOLOG_LOG_DIR) || !is_writable(WONOLOG_LOG_DIR)) {
        return;
    }

    $max_files = defined('WONOLOG_MAX_FILES') ? WONOLOG_MAX_FILES : 30;
    $log_level = defined('WONOLOG_LOG_LEVEL') ? WONOLOG_LOG_LEVEL : Logger::NOTICE;
    $handler = new Handler\RotatingFileHandler(WONOLOG_LOG_DIR . '/{date}.log', $max_files, $log_level);
    $handler->setFilenameFormat('{date}', 'Y-m-d');

    Wonolog\bootstrap($handler, Wonolog\USE_DEFAULT_PROCESSOR)
        ->use_hook_listener(new Wonolog\HookListener\DbErrorListener())
        ->use_hook_listener(new Wonolog\HookListener\FailedLoginListener())
        ->use_hook_listener(new Wonolog\HookListener\HttpApiListener())
        ->use_hook_listener(new Wonolog\HookListener\MailerListener())
        ->use_hook_listener(new Wonolog\HookListener\QueryErrorsListener())
        ->use_hook_listener(new Wonolog\HookListener\CronDebugListener())
        ->use_hook_listener(new Wonolog\HookListener\WpDieHandlerListener());
}
