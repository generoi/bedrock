set :application,       '<example-project>'
set :repo_url,          'git@github.com:generoi/<example-project>.git'
set :customer_username, '<example-project>'
set :theme_dir,         'web/app/themes/<example-project>'

# Hardcodes branch to always be master
# This could be overridden in a stage config file
set :branch, :master

# We are not deploying with deploy user to the JNT server, as the quota would count to that user.
# We deploy using the customer username,
set :deploy_to, -> { "/home/www/#{fetch(:customer_username)}/deploy" }

# Use :debug for more verbose output when troubleshooting
set :log_level, :info

# Apache users with .htaccess files:
# it needs to be added to linked_files so it persists across deploys:
set :linked_files, fetch(:linked_files, []).push('.env')
set :linked_dirs, fetch(:linked_dirs, []).push('web/app/uploads', 'web/app/cache')
set :shared_settings, '.env'

# We will after the deploy set all uploaded files to have the permissions of the customer
# So that the quota on the server will be counted towards that user.
set :file_permissions_paths, ['web']
set :file_permissions_users, [fetch(:customer_username)]

set :tail_options,            '-n 100 -f'
set :rsync_options,           '--recursive --times --compress'
set :composer_install_flags,  '--no-dev --no-interaction --quiet --optimize-autoloader'

# Assets
set :assets_dist_path,        -> { "#{fetch(:theme_dir)}/dist" }
set :assets_compile,          'npm run build'
# @todo vendor should be fetched on remote.
set :assets_output,           -> { [fetch(:assets_dist_path), "#{fetch(:theme_dir)}/vendor"] }

# Sanity check
before 'deploy:starting', 'deploy:check:pushed'
before 'deploy:starting', 'deploy:check:assets'
before 'deploy:starting', 'deploy:check:sshagent'

# Install plugins
before 'deploy:updated', 'composer:install'
# Compiled and rsync assets
after 'deploy:updated', 'assets:push'

# Clear the cache
after 'deploy:published', 'wp:cache:objectcache'
after 'deploy:published', 'wp:cache:timber'
after 'deploy:published', 'wp:cache:autoptimize'
after 'deploy:published', 'wp:cache:wpsc'

# Clear the locally compiled dist/ assets.
after 'deploy:finishing', 'wp:cache:dist'
