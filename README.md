# <example-project>

> **Note, here's a [diff of commits availabe upstream](https://github.com/generoi/bedrock/compare/genero...roots:master)**

Bedrock is a modern WordPress stack that helps you get started with the best development tools and project structure.

Much of the philosophy behind Bedrock is inspired by the [Twelve-Factor App](http://12factor.net/) methodology including the [WordPress specific version](https://roots.io/twelve-factor-wordpress/).

## Features

### Roots

* Better folder structure
* Dependency management with [Composer](https://getcomposer.org)
* Easy WordPress configuration with environment specific files
* Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
* Autoloader for mu-plugins (use regular plugins as mu-plugins)
* Enhanced security (separated web root and secure passwords with [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))

### Genero

* Drupal based security enhancements in `.htaccess` *(note: by default we block direct access to all PHP files, and whitelist the few that are allowed).*
* Long term expire headers for production in `.htaccess` *(disabled in development)*.
* Capistrano using our [capistrano-tasks](https://github.com/generoi/capistrano-tasks/) gem.
* A `Makefile` for pulling and pushing uploads/databases between environments.
* A Vagrant environment using [Drupal VM](http://docs.drupalvm.com).
* Composer tasks for building and linting the project. If needed you can customize these for your project.
* Access to remote environments through [`wp-cli`](https://github.com/wp-cli/wp-cli) *(see [`wp-cli.yml`](https://github.com/generoi/bedrock/blob/genero/wp-cli.yml) for a few manual steps to improve DX)*.

## Requirements

* PHP >= 7.1
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
* Ansible 2.2.0.0 or higher
* Vagrant 1.8.7 or higher
* An updated verison of VirtualBox (on OS X)
* NodeJS
* Yarn
* Bundler

## Local project development

    git clone --recursive git@github.com:generoi/<example-project>.git <example-project>
    cd <example-project>

    # Install composer dependencies and development tools
    composer install:development

    # Build the VM
    vagrant up

    # To sync files from your computer to the virtual machine, run
    vagrant rsync-auto

    # Fetch the remote database and uploads
    robo db:pull @production
    robo files:pull @production

    # When you run `composer install:development` a set of git hooks will be configured,
    # you can disable these on a per-commit basis with the -n (--no-verify) flag
    git commit --amend -n

#### Using WP-CLI locally

Install WP-CLI

    composer global require wp-cli/wp-cli

Usage (eg how to import a db from local)

    wp @dev db cli < dump.sql

## roots/bedrock's own setup instructions

#### Installation

1. Create a new project:
    ```sh
    $ composer create-project roots/bedrock
    ```
2. Update environment variables in the `.env` file:
  * Database variables
    * `DB_NAME` - Database name
    * `DB_USER` - Database user
    * `DB_PASSWORD` - Database password
    * `DB_HOST` - Database host
    * Optionally, you can define `DATABASE_URL` for using a DSN instead of using the variables above (e.g. `mysql://user:password@127.0.0.1:3306/db_name`)
  * `WP_ENV` - Set to environment (`development`, `staging`, `production`)
  * `WP_HOME` - Full URL to WordPress home (https://example.com)
  * `WP_SITEURL` - Full URL to WordPress including subdirectory (https://example.com/wp)
  * `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`
    * Generate with [wp-cli-dotenv-command](https://github.com/aaemnnosttv/wp-cli-dotenv-command)
    * Generate with [our WordPress salts generator](https://roots.io/salts.html)
3. Add theme(s) in `web/app/themes/` as you would for a normal WordPress site
4. Set the document root on your webserver to Bedrock's `web` folder: `/path/to/site/web/`
5. Access WordPress admin at `https://example.com/wp/wp-admin/`

## Create a new project and Git repository

1. Create a new project in a new folder for your project

    ```sh
    # Prompt, create and enter directory
    echo 'Project directory:'; read project; composer create-project --keep-vcs --repository-url="https://packagist.minasithil.genero.fi" generoi/bedrock:dev-genero $project; cd $project;

    # Just create
    composer create-project --keep-vcs --repository-url="https://packagist.minasithil.genero.fi" generoi/bedrock:dev-genero <project-dir>
    ```

2. Setup the VM

    ```sh
    # Build the VM
    vagrant up

    # To sync files from your computer to the virtual machine, run
    vagrant rsync-auto
    ```

3. Setup the staging environment

    ```sh
    # Configure the staging environment
    vim config/deploy/staging.rb
    vim wp-cli.yml
    vim robo.yml

    # Setup the directory structure
    cap staging wp:setup

    # Deploy your code, files and database
    cap staging deploy
    robo db:push @staging
    robo files:push @staging

    # Deploy once more with database available
    cap staging deploy
    ```

8. Setup the production environment

    ```sh
    # Configure the production environment
    vim config/deploy/production.rb
    vim wp-cli.yml
    vim robo.yml

    # Setup the directory structure
    cap production wp:setup

    # Deploy your code, files and database
    cap production deploy
    robo db:push @production
    robo files:push @production

    # Deploy once more with database available
    cap production deploy
    ```

## Deploying

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

## Bedrock sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a> <a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a> <a href="https://www.itineris.co.uk/"><img src="https://cdn.roots.io/app/uploads/itineris.svg" alt="itineris" width="200" height="150"></a>

## Community

Keep track of development and community news.

* Participate on the [Roots Discourse](https://discourse.roots.io/)
* Follow [@rootswp on Twitter](https://twitter.com/rootswp)
* Read and subscribe to the [Roots Blog](https://roots.io/blog/)
* Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
* Listen to the [Roots Radio podcast](https://roots.io/podcast/)
