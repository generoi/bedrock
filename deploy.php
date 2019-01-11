<?php

namespace Deployer;

require 'recipe/wordpress.php';
require 'recipe/cachetool.php';
require 'recipe/rsync.php';

set('uploads_dir', 'web/app/uploads');
set('cache_dir', 'web/app/cache');
set('theme_dir', 'web/app/themes/sage'); // @todo robo.yml
set('build_path', __DIR__ . '/.build');
set('artifact_dir', '{{build_path}}/artifact');
set('keep_releases', 5);
set('branch', 'genero');

set('shared_files', ['.env']);
set('shared_dirs', ['{{uploads_dir}}', '{{cache_dir}}']);
set('writable_dirs', get('shared_dirs'));

set('bin/robo', '{{release_path}}/vendor/bin/robo');
set('bin/wp', function () {
    // @todo project specific
    return run('which wp');
});
set('bin/npm', function () {
    return run('which npm');
});

set('default_stage', 'production');
set('ssh_multiplexing', true);
set('rsync_src', '{{artifact_dir}}');
set('rsync_dest', '{{deploy_path}}');
set('copy_dirs', ['config', 'web', 'vendor']);

set('rsync', [
    'exclude'       => [],
    'include'       => [],
    'filter'        => [],
    'exclude-file'  => false,
    'include-file'  => false,
    'filter-file'   => false,
    'filter-perdir' => false,
    'flags'         => 'rz', // Recursive, with compress
    'options'       => ['delete'],
    'timeout'       => 3600,
]);

set('artifact_exclude', [
    '.git',
    'node_modules',
    '*.sql',
    '/CHANGELOG.md',
    '/CODE_OF_CONDUCT.md',
    '/config/config.yml',
    '/config/patches',
    '/config/vagrant.config.yml',
    '/composer.json',
    '/composer.lock',
    '/deploy.php',
    '/LICENSE.md',
    '/phpcs.xml',
    '/README.md',
    '/robo.yml',
    '/RoboFile.php',
    '/Vagrantfile',
    '/Vagrantfile.local',
    '/wp-cli.yml',
]);


/**
 * Hosts
 * ---------------------------------------------------------------------------
 */
host('production')
    ->hostname('go2-1.multi.fi') // @todo robo.yml
    ->user('deploy')
    ->addSshOption('ProxyCommand', 'ssh deploy@minasithil.genero.fi -W %h:%p')
    // ->set('http_user', 'apache')
    ->set('deploy_path','/home/www/<example-project>/deploy')
    ->set('cachetool', '127.0.0.1:9000');

host('staging')
    ->hostname('minasithil.genero.fi')
    ->user('deploy')
    ->set('http_user', 'www-data')
    ->set('deploy_path','/var/www/staging/testing');

/**
 * wordpress.php
 * ---------------------------------------------------------------------------
 */
desc('Clear timber cache');
task('cache:clear:timber', function () {
    run('cd {{release_path}} && rm -rf {{cache_dir}}/timber');
});

desc('Clear WP Super Cache cache');
task('cache:clear:wpsc', function () {
    run('cd {{release_path}} && rm -rf {{cache_dir}}/blogs {{cache_dir}}/meta {{cache_dir}}/supercache {{cache_dir}}/wp-cache-*');
});

desc('Clear WP Object Cache');
task('cache:clear:objectcache', function () {
    run('cd {{release_path}} && {{bin/wp}} cache flush');
});

/**
 * remote.php
 * ---------------------------------------------------------------------------
 */
desc('Open a SSH session');
task('ssh', function () {
    run('bash');
});

/**
 * artifact.php
 * ---------------------------------------------------------------------------
 */
desc('Build a release artifact');
task('build:artifact', function () {
    set('rsync', [
        'exclude'       => get('artifact_exclude'),
        'include'       => [],
        'filter'        => [],
        'exclude-file'  => false,
        'include-file'  => false,
        'filter-file'   => false,
        'filter-perdir' => false,
        'flags'         => 'r', // Recursive
        'options'       => ['delete'],
        'timeout'       => 3600,
    ]);

    set('rsync_src', '{{release_path}}');
    set('rsync_dest', '{{artifact_dir}}');
    invoke('rsync');
});

desc('Build release');
task('build', function () {
    set('repository', __DIR__);
    set('deploy_path', get('build_path'));
    set('keep_releases', 1);
    set('shared_files', []);
    set('shared_dirs', ['{{theme_dir}}/node_modules','{{theme_dir}}/vendor', 'vendor']);

    invoke('deploy:prepare');
    invoke('deploy:release');
    invoke('deploy:update_code');
    invoke('deploy:shared');
    invoke('deploy:vendors');
    invoke('build:theme');
    invoke('deploy:symlink');
    invoke('build:artifact');
    invoke('cleanup');
})->local();


/**
 * Build theme
 * ---------------------------------------------------------------------------
 */
desc('Build theme assets');
task('build:theme', function () {
    run('cd {{release_path}}/{{theme_dir}} && {{bin/composer}} {{composer_options}}');
    run('cd {{release_path}}/{{theme_dir}} && {{bin/npm}} install', ['timeout' => 1000]);
    run('cd {{release_path}} && {{bin/robo}} build:production');
});

/**
 * Clear caches
 * ---------------------------------------------------------------------------
 */
desc('Clear caches');
task('cache:clear', [
    'cache:clear:timber',
    'cache:clear:wpsc',
    'cachetool:clear:opcache',
    'cachetool:clear:apc',
]);

/**
 * Deploy flow
 * ---------------------------------------------------------------------------
 */
desc('Deploy release');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:copy_dirs', // copy previous code for faster rsync

    'build',
    'rsync',

    'deploy:shared',
    'deploy:writable',
    'deploy:symlink',

    // 'cache:clear',

    'deploy:unlock',
    'cleanup',
    'success',
]);

after('rollback', 'cache:clear');
after('deploy:failed', 'deploy:unlock');
