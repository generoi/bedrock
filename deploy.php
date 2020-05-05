<?php

namespace Deployer;

require 'recipe/wordpress.php';
require 'recipe/cachetool.php';
require 'recipe/rsync.php';
require 'recipe/deploy/rollback.php';

$robo = \Grasmash\YamlExpander\Expander::parse(file_get_contents(__DIR__ . '/robo.yml'));

set('scaffold_machine_name', $robo['machine_name']);
set('scaffold_env_file', __DIR__ . '/.env.example');
set('theme_dir', $robo['theme_path']);
set('keep_releases', 5);
set('branch', 'master');
set('default_stage', 'production');
set('ssh_multiplexing', true);

set('shared_files', ['.env']);
set('shared_dirs', ['web/app/uploads']);
set('writable_dirs', array_merge(get('shared_dirs'), ['{{theme_dir}}/storage', 'web/app/cache']));

set('bin/robo', './vendor/bin/robo');
set('bin/wp', './vendor/bin/wp');
set('bin/npm', function () {
    return run('which npm');
});

/**
 * Deploy configuration
 */
set('rsync_src', '{{build_artifact_dir}}');
set('rsync_dest', '{{release_path}}');
set('rsync', [
    'exclude'       => [],
    'include'       => [],
    'filter'        => [],
    'exclude-file'  => false,
    'include-file'  => false,
    'filter-file'   => false,
    'filter-perdir' => false,
    'flags'         => 'rv',
    'options'       => ['delete', 'links'],
    'timeout'       => 3600,
]);

/**
 * Build configuration
 */
set('build_repository', __DIR__); // @todo github
set('build_shared_dirs', []);
set('build_copy_dirs', ['{{theme_dir}}/vendor', 'vendor', '{{theme_dir}}/node_modules']);
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
    '/Vagrantfile*',
]);

require 'vendor/generoi/deployer-genero/common.php';
require 'vendor/generoi/deployer-genero/build.php';
require 'vendor/generoi/deployer-genero/setup.php';
require 'vendor/generoi/deployer-genero/wordpress.php';

/**
 * Hosts
 */
if (!empty($prod = $robo['env']['@production'])) {
    host('production')
        ->hostname($prod['host'])
        ->user($prod['user'])
        ->set('deploy_path', dirname($prod['path']))
        // ->set('http_user', 'apache')
        // ->set('bin/wp', '/usr/local/bin/wp')
        ->set('cachetool', '127.0.0.1:11000');
}

if (!empty($staging = $robo['env']['@staging'])) {
    host('staging')
        ->hostname($staging['host'])
        ->user($staging['user'])
        ->set('http_user', 'www-data')
        ->set('deploy_path', dirname($staging['path']));
}

/**
 * Deploy
 */
desc('Clear caches');
task('cache:clear', [
    'cache:clear:wp:wpsc',
    'cachetool:clear:opcache',
    'cache:clear:wp:objectcache',
    'cache:clear:wp:acorn',
    'cache:wp:acorn',
]);

task('build:assets', function () {
    run('cd {{release_path}}/{{theme_dir}} && {{bin/composer}} {{composer_options}}');
    if (!get('use_quick')) {
        run('cd {{release_path}}/{{theme_dir}} && {{bin/npm}} install --no-audit', ['timeout' => 1000]);
    }
    run('cd {{release_path}}/{{theme_dir}} && {{bin/npm}} run lint');
    run('cd {{release_path}} && {{bin/robo}} build:production');
    run('ls {{release_path}}/{{theme_dir}}/dist');
});

desc('Deploy release');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',

    'build',

    'rsync:warmup',
    'rsync',

    'deploy:shared',
    'deploy:writable',
    'deploy:symlink',

    'cache:clear',

    'deploy:unlock',
    'cleanup',
    'success',
]);

after('rollback', 'cache:clear');
after('deploy:failed', 'deploy:unlock');
