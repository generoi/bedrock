<?php

namespace Deployer;

use Robo\Robo;

import('recipe/wordpress.php');
import('contrib/cachetool.php');
import('contrib/rsync.php');
import('recipe/deploy/rollback.php');
import('vendor/generoi/deployer-genero/common.php');
import('vendor/generoi/deployer-genero/setup.php');
import('vendor/generoi/deployer-genero/wordpress.php');

require_once __DIR__ . '/vendor/autoload.php';
$robo = Robo::createConfiguration(['robo.yml'])->export();

set('scaffold_machine_name', $robo['machine_name']);
set('scaffold_env_file', __DIR__ . '/.env.example');
set('theme_dir', $robo['theme_path']);
set('keep_releases', 5);
// set('branch', 'master')
set('default_stage', 'production');
set('ssh_multiplexing', true);

set('shared_files', ['.env']);
set('shared_dirs', ['web/app/uploads']);
set('writable_dirs', ['web/app/cache', ...get('shared_dirs')]);
set('writable_mode', 'chmod');
set('writable_use_sudo', false);
set('writable_chmod_mode', 'ug+w');

set('bin/robo', './vendor/bin/robo');
set('bin/wp', './vendor/bin/wp');

/**
 * Deploy configuration
 */
set('rsync_src', '{{build_artifact_dir}}');
set('rsync_dest', '{{release_path}}');
set('rsync', [
    'exclude'       => [...get('writable_dirs'), ...get('shared_files')],
    'include'       => [],
    'filter'        => [],
    'exclude-file'  => false,
    'include-file'  => false,
    'filter-file'   => false,
    'filter-perdir' => false,
    'flags'         => 'rv',
    'options'       => ['delete', 'links', 'chmod=u+w'],
    'timeout'       => 3600,
]);

/**
 * Build configuration
 */
set('build_repository', __DIR__); // @todo github
set('build_path', '/tmp/dep-' . basename(__DIR__));
set('build_artifact_dir', '{{build_path}}/artifact');
set('build_artifact_exclude', [
    '.git',
    'node_modules',
    '*.sql',
    '/.*',
    '/*.md',
    '/config/*.yml',
    '/config/patches',
    '/composer.json',
    '/composer.lock',
    '/*.php',
    '/*.xml',
    '/*.yml',
]);

/**
 * Hosts
 */
if (!empty($prod = $robo['env']['@production'])) {
    host('production')
        ->setHostname($prod['host'])
        ->setPort($prod['port'] ?? 22)
        ->setRemoteUser($prod['user'])
        ->set('url', $prod['url'])
        ->set('deploy_path', dirname($prod['path']))
        ->set('bin/wp', '{{ release_path }}/vendor/bin/wp');
        // ->set('http_user', 'apache')
        // ->set('bin/wp', '/usr/local/bin/wp')
        // ->set('cachetool', '127.0.0.1:11000')
}

if (!empty($staging = $robo['env']['@staging'])) {
    host('staging')
        ->setHostname($staging['host'])
        ->setPort($staging['port'] ?? 22)
        ->setRemoteUser($staging['user'])
        ->set('url', $staging['url'])
        ->set('deploy_path', dirname($staging['path']))
        ->set('bin/wp', '{{ release_path }}/vendor/bin/wp')
        ->set('scaffold_home_url', $staging['url']);
}

/**
 * Build tasks
 */
task('build:setup', function () {
    runLocally('rm -rf {{build_path}}');
    runLocally('mkdir -p {{build_path}}');
    runLocally('git clone {{build_repository}} {{build_path}}');
});

task('build:composer', function () {
    runLocally('cd {{build_path}} && composer {{composer_action}} {{composer_options}}');
});

task('build:theme', function () {
    runLocally('cd {{build_path}}/{{theme_dir}} && composer {{composer_action}} {{composer_options}}');
    runLocally('cd {{build_path}}/{{theme_dir}} && npm install --no-audit', ['timeout' => 1000]);
    runLocally('cd {{build_path}}/{{theme_dir}} && npm run lint');
    runLocally('cd {{build_path}} && {{bin/robo}} build:production');
    runLocally('ls {{build_path}}/{{theme_dir}}/public');
});

task('build:artifact', function () {
    // Sanitize content by copying files into an artifact directory
    $exclude = array_reduce(get('build_artifact_exclude'), function ($carry, $exclude) {
        return $carry . ' --exclude=' . escapeshellarg($exclude);
    }, '');
    runLocally("rsync -r --delete --links $exclude '{{build_path}}/' '{{build_artifact_dir}}/'");
});

desc('Build release locally');
task('build', [
    'build:setup',
    'build:composer',
    'build:theme',
    'build:artifact',
]);

/**
 * Cache clearing
 */
desc('Clear caches');
task('cache:clear', [
    'cache:clear:kinsta',
    'cache:clear:wp:wpsc',
    // 'cachetool:clear:opcache',
    'cache:clear:wp:objectcache',
    'cache:clear:wp:acorn',
    // 'cache:wp:acorn',
]);

task('deploy:update_code', function () {
    // Do not store the git repository on remote.
});

desc('Deploy release');
task('deploy', [
    'deploy:prepare',
    'build',
    'rsync:warmup',
    'rsync',
    'deploy:publish',
]);

after('deploy:failed', 'deploy:unlock');
// Clear the cache @todo setup
after('deploy:symlink', 'cache:clear');
after('rollback', 'cache:clear');
