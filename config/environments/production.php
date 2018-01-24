<?php
/** Production */
ini_set('display_errors', 0);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', false);
/** Disable all file modifications including updates and update notifications */
define('DISALLOW_FILE_MODS', true);
define('WP_CACHE', true);

/** WP Mail SMTP hardcoded configuration */
define('WPMS_ON', true);
define('WPMS_MAILER', 'smtp');
define('WPMS_SMTP_HOST', 'smtp.multi.fi');
define('WPMS_SMTP_PORT', 465);
define('WPMS_SSL', 'ssl');
define('WPMS_SMTP_AUTH', false);
