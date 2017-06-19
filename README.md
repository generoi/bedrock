# <example-project>

> **Note, here's a [diff of commits availabe upstream](https://github.com/generoi/bedrock/compare/genero...roots:master)**

Bedrock is a modern WordPress stack that helps you get started with the best development tools and project structure.

Much of the philosophy behind Bedrock is inspired by the [Twelve-Factor App](http://12factor.net/) methodology including the [WordPress specific version](https://roots.io/twelve-factor-wordpress/).

## Features

* Better folder structure
* Dependency management with [Composer](http://getcomposer.org)
* Easy WordPress configuration with environment specific files
* Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
* Autoloader for mu-plugins (use regular plugins as mu-plugins)
* Enhanced security (separated web root and secure passwords with [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))

Use [Trellis](https://github.com/roots/trellis) for additional features:

* Easy development environments with [Vagrant](http://www.vagrantup.com/)
* Easy server provisioning with [Ansible](http://www.ansible.com/) (Ubuntu 16.04, PHP 7.1, MariaDB)
* One-command deploys

See a complete working example in the [roots-example-project.com repo](https://github.com/roots/roots-example-project.com).

## Requirements

* PHP >= 5.6
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
* Ansible 2.2.0.0 or higher
* Vagrant 1.8.7 or higher
* An updated verison of VirtualBox (on OS X)
* node
* yarn
* bundler

## Installation

### Local development

    git clone --recursive git@github.com:generoi/<example-project>.git <example-project>
    cd <example-project>

    # Install dependencies
    composer install

    # Build the VM
    vagrant up

    # To sync files from your computer to the virtual machine, run
    vagrant rsync-auto

#### Add SSH configurations for the remote hosts

For you to be able to access the remote hosts with WP-CLI you need to add the
following to your `~/.ssh/config` file.

    Host <example-project>.dev
      StrictHostKeyChecking no
      IdentityFile ~/.vagrant.d/insecure_private_key
      ForwardAgent yes

    Host <example-project>.fi
      ForwardAgent yes
      ProxyCommand ssh deploy@minasithil.genero.fi nc %h %p 2> /dev/null

#### Using WP-CLI locally

Install WP-CLI

    composer global require wp-cli/wp-cli

Usage (eg how to import a db from local)

    wp @dev db cli < dump.sql

### minasanor.genero.fi

#### Clone the git repo

Do this in you /var/www/u/USERNAME/ forlder on the dev server, unless you use
a VM on your own machine with vagrant, than this will be the "site" folder....

    git clone --recursive git@github.com:generoi/<example-project>.git <example-project>

#### Fetch what is needed

Fetch both the needed php (to build the site with its plugins and fetch wp
core) and ruby code (that capistrano needs) by running

    composer install

if composer complains, do the composer udpate using the `--ignore-platform-reqs` flag

    composer update --ignore-platform-reqs

if capistrano complains that somethings is missing, it might be that you need
to run bundle again if the Capfile has been updated what it requires but it has
not yet been fetched

#### Set up database and Wordpress

1. Create a new project in a new folder for your project:

  `composer create-project roots/bedrock your-project-folder-name`

2. Update environment variables in `.env`  file:
  * `DB_NAME` - Database name
  * `DB_USER` - Database user
  * `DB_PASSWORD` - Database password
  * `DB_HOST` - Database host
  * `WP_ENV` - Set to environment (`development`, `staging`, `production`)
  * `WP_HOME` - Full URL to WordPress home (http://example.com)
  * `WP_SITEURL` - Full URL to WordPress including subdirectory (http://example.com/wp)
  * `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`

  If you want to automatically generate the security keys (assuming you have wp-cli installed locally) you can use the very handy [wp-cli-dotenv-command][wp-cli-dotenv]:

      wp package install aaemnnosttv/wp-cli-dotenv-command

      wp dotenv salts regenerate

  Or, you can cut and paste from the [Roots WordPress Salt Generator][roots-wp-salt].

3. Add theme(s) in `web/app/themes` as you would for a normal WordPress site.

4. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)

5. Access WP admin at `http://example.com/wp/wp-admin`

## Setup a new repository

1. Clone the repo

    ```sh
    git clone --recursive git@github.com:generoi/bedrock.git foobar
    ```

2. Clone the theme

    ```sh
    cd foobar/web/app/themes;

    git clone git@github.com:generoi/sage.git foobar

    cd foobar

    # Delete the git files
    rm -rf .git

    # Install dependencies
    yarn
    composer install

    # Return to the root of the project
    cd -
    ```

3. Setup repo

    ```sh
    # Install dependencies
    composer install

    # Setup git hooks
    git config core.hooksPath "vendor/generoi/git-hooks/hooks"

    # Setup the ENV variables (pre-configured for the VM)
    cp .env.example .env
    ```

4. Rename everything (relies on your theme being named the same as the repository)

    ```sh
    # Search and replace all references to the project
    find . \( -wholename ./web/wp -o -wholename ./web/app/plugins -o -name vendor -o -name .git \) -prune -o -type f -print0 | xargs -0 sed -i 's/<example-project>/foobar/g'

    # You need to manually setup the production host in:
    # - `Makefile`
    # - `config/deploy/production.rb`
    # - `wp-cli.yml`
    ```

5. Setup the new remote git repository

    ```sh
    # Remove the existing master branch (bedrocks own)
    git branch -D master

    # Switch to a new master branch for this project
    git checkout -b master

    # Create a new repository on github
    open https://github.com/organizations/generoi/repositories/new

    # Set origin url to to the newly created github repository
    git remote set-url origin git@github.com:generoi/<example-project>.git

    # Push the code
    git push -u origin master
    ```

6. Setup the VM

    ```sh
    # Change the VM IP to something unique
    vim config/vagrant.config.yml

    # Build the VM
    vagrant up

    # To sync files from your computer to the virtual machine, run
    vagrant rsync-auto
    ```

7. Setup staging evironment

    ```sh
    # Configure the staging environment
    vim config/deploy/staging.rb
    vim wp-cli.yml
    vim Makefile

    # Setup the directory structure
    cap staging wp:setup

    # Deploy your code, files and database
    cap staging deploy
    make staging-push-db
    make staging-push-files
    ```

8. Setup production evironment

    ```sh
    # Configure the production environment
    vim config/deploy/production.rb
    vim wp-cli.yml
    vim Makefile

    # Setup the directory structure
    cap production wp:setup

    # Deploy your code, files and database
    cap production deploy
    make production-push-db
    make production-push-files
    ```

## Deploys

    ```sh
    # Deploy to staging
    cap staging deploy

    # Deploy to production
    cap production deploy

    # Clear all caches on production
    cap production wp:cache
    # Clear only WP Super Cache cache
    cap production wp:cache:wpsc

    # Deploy assets only
    cap production assets:push

    # Open a shell on production server
    cap production ssh
    ```

## Documentation

Bedrock documentation is available at [https://roots.io/bedrock/docs/](https://roots.io/bedrock/docs/).

## Contributing

Contributions are welcome from everyone. We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Community

Keep track of development and community news.

* Participate on the [Roots Discourse](https://discourse.roots.io/)
* Follow [@rootswp on Twitter](https://twitter.com/rootswp)
* Read and subscribe to the [Roots Blog](https://roots.io/blog/)
* Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
* Listen to the [Roots Radio podcast](https://roots.io/podcast/)

[roots-wp-salt]:https://roots.io/salts.html
[wp-cli-dotenv]:https://github.com/aaemnnosttv/wp-cli-dotenv-command
