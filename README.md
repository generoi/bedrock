# <example-project>

> **Note, here's a [diff](https://github.com/generoi/bedrock/compare/genero...roots:master) of upstream commits missing from our bedrock fork**

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
* Builds tasks using our [generoi/robo-genero](https://github.com/generoi/robo-genero) package.
* Deployer tasks using our [generoi/deployer-genero](https://github.com/generoi/deployer-genero) package.
* A Vagrant environment using [Drupal VM](http://docs.drupalvm.com).
* Composer tasks for building and linting the project. If needed you can customize these for your project.
* Access to remote environments through [`wp-cli`](https://github.com/wp-cli/wp-cli) *(see [`wp-cli.yml`](https://github.com/generoi/bedrock/blob/genero/wp-cli.yml) for a few manual steps to improve DX)*.

## Requirements

_For windows but also new macs also see the [system requirements installation steps](#system-requirements-installation-for-windows)._

* PHP >= 7.2
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
* Vagrant >= 1.8.7
  * _In WSL, the version must match the version in Windows itself_
* VirtualBox >= 6.0.14 (=6.0.14 for Windows development)
* Ansible >= 2.5 (for faster provisioning but not required)
* Node.js >= 12 (if running commands from the host machine)

## Local project development (Vagrant)

#### Working from host machine (macOS)

    git clone --recursive git@github.com:generoi/<example-project>.git <example-project>
    cd <example-project>

    # Install composer dependencies and development tools
    composer install:development

    # Build the VM
    vagrant up

    # Make sure you have an ssh-agent running and that you have access to all remote environments
    eval $(ssh-agent -s)
    ssh-add

    # Fetch the remote database and uploads
    ./vendor/bin/robo db:pull @production
    ./vendor/bin/robo files:pull @production

    # When you run `composer install:development` a set of git hooks will be configured,
    # you can disable these on a per-commit basis with the -n (--no-verify) flag
    git commit --amend -n

    # Watch/build theme assets
    cd web/app/themes/<example-project>
    npm run build
    npm run build:production
    npm run start
    
    # Remember to update GDS when starting a new project
    npm i genero-design-system

#### Working with WSL (Windows)

_Note: Below "WSL" refers to Windows Subsystem for Linux, and "Windows" refers to native, non-WSL Windows._

The basic setup for a Windows + WSL + Vagrant -based solution is as follows:

- Edit your files, manage your repository and access the site in Windows.
- Run WSL in Windows. WSL is used for installing dependencies and running
  development commands. Use WSL for all `composer`, `robo` and `npm` commands in order to avoid vboxsf issues in Vagrant.
- Run Vagrant in WSL.  Vagrant is used for hosting WordPress and running
  deployment commands. Use vagrant for the `dep` command, in order to avoid
  performance issues in WSL.

With WSL and Vagrant installed in Windows, follow these steps:

    # Clone the project
    git clone --recursive git@github.com:generoi/<example-project>.git <example-project>

    # Start and login to the WSL. The rest of the commands are run in WSL.
    # Prepare the project (resides on windows drive)
    cd /mnt/<drive>/<example-project>

    # TODO: Add records to the ssh config...
    # Here instructions what and from where to get them

    # Make sure you have ssh-agent running and that your new (or existing)
    # public key is installed where needed
    eval $(ssh-agent -s)
    ssh-add

    # Install composer dependencies and development tools
    composer install:development

    # Build the VM
    vagrant up

    # Fetch the remote database and uploads
    ./vendor/bin/robo db:pull @production
    ./vendor/bin/robo files:pull @production

    # Build and watch theme assets
    cd web/app/themes/<example-project>
    npm run build
    npm run build:production
    npm run start

In order to be able to access the site in Windows, you'll have to modify your
hosts files manually, as this is only done in WSL for you. Check the hosts
configuration in WSL with `cat /etc/hosts` and copy the parts relating to
`<example-project>.test` to `c:\Windows\System32\drives\etc\hosts` in Windows.
After that, you can access the site at `http://<example-project>.test`.

When managing your repository in Windows, you'll want to disable git hooks as
they rely on commands that only work in WSL for you.

If you have trouble accessing symlinked files in Vagrant, such as
`vendor/bin/dep`, make sure that you have vagrant-vbguest installed in WSL:

    vagrant plugin install vagrant-vbguest

#### Working from guest machine

    # Clone the project
    git clone --recursive git@github.com:generoi/<example-project>.git <example-project>
    cd <example-project>

    # Install composer dependencies
    composer install

    # Make sure you have an ssh-agent running and that you have access to all remote environments
    eval $(ssh-agent -s)
    ssh-add

    # Make sure vagrant-hostsupdater is not installed (otherwise localhost:3000 won't load)
    vagrant plugin uninstall vagrant-hostsupdater

    # Build the VM
    vagrant up
    vagrant ssh

    # From now on run all commands from within the VM
    cd /var/www/wordpress

    # Install theme composer dependencies and development tools
    composer install:development

    # Fetch the remote database and uploads
    ./vendor/bin/robo db:pull @production --target=self
    ./vendor/bin/robo files:pull @production

    # Watch/build theme assets
    cd web/app/themes/<example-project>
    npm run build
    npm run build:production
    npm run start

## Docker environment with ddev

    # Clone the repository and install the development dependencies as
    # mentioned in the Vagrant setup instructions

    # Launch the docker container
    ddev start

    # Fetch the remote database and uploads
    ./vendor/bin/robo db:pull @production --target=@docker
    ./vendor/bin/robo files:pull @production

#### Using WP-CLI locally

Install WP-CLI

    composer global require wp-cli/wp-cli

Usage (eg how to import a db from local)

    wp @dev db cli < dump.sql

## System requirements installation for Windows

* Install [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (WSL)

* Install PHP requirements within WSL

      sudo apt-get update
      sudo apt-get install -y git php7.4{,-curl,-mbstring,-xml,-yaml,-json,-zip}

* [Install Composer](https://getcomposer.org/download/) within WSL

      # …after installed, make composer available globally
      mv composer.phar /usr/local/bin/composer

* [Download](https://www.vagrantup.com/downloads.html) and [install](https://www.vagrantup.com/docs/other/wsl.html) Vagrant within WSL _(Note that when Vagrant is installed on the Windows system, the version installed within the Linux distribution must match)_

      # Example for v2.2.8
      wget https://releases.hashicorp.com/vagrant/2.2.8/vagrant_2.2.8_x86_64.deb
      dpkg -i vagrant_2.2.8_x86_64.deb

* Export the required environment variables in your ~/.bashrc

      echo 'export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1"' >> ~/.bashrc
      echo 'export PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox"' >> ~/.bashrc

      # If you keep your projects outside your user's home directory:
      # export VAGRANT_WSL_WINDOWS_ACCESS_USER_HOME_PATH="/mnt/<windows-drive>/<path>"

      source ~/.bashrc

* Go to the directory where you store your projects and continue with the [local project development steps](#working-with-wsl-windows) for working within WSL.

      cd /mnt/<windows-drive>/<path>


## roots/bedrock's own setup instructions

#### Installation

1. Create a new project:
    ```sh
    $ composer create-project roots/bedrock
    ```
2. Update environment variables in the `.env` file. Wrap values that may contain non-alphanumeric characters with quotes, or they may be incorrectly parsed.
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

NOTE: If possible set the project name and repo name to use the domain name of the website. Example: `www.my-site.fi` => `my-site`. This will help with configuring all the different environments in the future.

1. Create a new project in a new folder for your project

    ```sh
    # Prompt, create and enter directory
    echo 'Project directory:'; read project; composer create-project --keep-vcs --repository-url="https://packagist.minasithil.genero.fi" generoi/bedrock:dev-master $project; cd $project;

    # Just create
    composer create-project --keep-vcs --repository-url="https://packagist.minasithil.genero.fi" generoi/bedrock:dev-master <project-dir>
    
    # If you cloned the repo rather than used `create-project` you'll need to:
    
    # 1. You need to first install robo.
    composer install:development
    
    # 2. replace the placeholder names with a project machine name.
    ./vendor/bin/robo search:replace
    ```

2. Setup the VM

    ```sh
    # Make sure vagrant-hostsupdater is not installed (otherwise localhost:3000 won't load)
    vagrant plugin uninstall vagrant-hostsupdater
    
    # Build the VM
    vagrant up
    ```

3. Setup the staging environment

    ```sh
    # Configure the staging environment
    vim config/deploy/staging.rb
    vim wp-cli.yml
    vim robo.yml

    # Setup the directory structure
    # For now you'll need to create the database manually.
    ./vendor/bin/dep setup staging

    # Deploy your code, files and database
    ./vendor/bin/robo db:push @staging
    ./vendor/bin/robo files:push @staging

    # Deploy once more with database available
    ./vendor/bin/dep deploy staging --quick
    ```

8. Setup the production environment

    ```sh
    # Configure the production environment
    vim config/deploy/production.rb
    vim wp-cli.yml
    vim robo.yml

    # Setup the directory structure
    # For now you'll need to create the database manually.
    ./vendor/bin/dep setup staging

    # Deploy your code, files and database
    ./vendor/bin/robo db:push @production
    ./vendor/bin/robo files:push @production

    # Deploy once more with database available
    ./vendor/bin/dep deploy production --quick
    ```

## Deploying (with GitHub actions)

Requires that the project has GitHub Actions configured. To configure it you essentially have to setup `dep` to work with the remotes and then renaming the workflow files in `.github/workflows/`

```sh
./vendor/bin/robo deploy:production
./vendor/bin/robo deploy:staging --branch=patch-1
./vendor/bin/robo deploy:staging --log_level='-vvv'

# You can still use `dep` directly like described in the section below
./vendor/bin/dep cache:clear production
```

## Deploying (from local computer)

See [https://github.com/generoi/deployer-genero](https://github.com/generoi/deployer-genero).

```sh
# Deploy to staging/production
./vendor/bin/dep deploy staging
./vendor/bin/dep deploy production

# Each deploy re-installs all NPM packages in the theme, if you haven't made
# any package.json changes since your last deploy you can use `--quick` flag
# to skip this step
./vendor/bin/dep deploy production --quick

# Clear all caches on production
./vendor/bin/dep cache:clear production
# Clear only WP Super Cache cache
./vendor/bin/dep cache:clear:wpsc production

# Open a shell on production server
./vendor/bin/dep ssh production
```

## Documentation

Bedrock documentation is available at [https://roots.io/bedrock/docs/](https://roots.io/bedrock/docs/).

## Contributing

Contributions are welcome from everyone. We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bedrock sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a> <a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a> <a href="https://scaledynamix.com/"><img src="https://cdn.roots.io/app/uploads/scale-dynamix.svg" alt="Scale Dynamix" width="200" height="150"></a>

## Community

Keep track of development and community news.

* Participate on the [Roots Discourse](https://discourse.roots.io/)
* Follow [@rootswp on Twitter](https://twitter.com/rootswp)
* Read and subscribe to the [Roots Blog](https://roots.io/blog/)
* Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
* Listen to the [Roots Radio podcast](https://roots.io/podcast/)
