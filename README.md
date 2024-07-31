# gdsbedrock

_See [roots/bedrock](https://github.com/roots/bedrock#readme) readme for notes about the stack._

## Genero features

- Build tasks using [Robo](https://robo.li/) and our [generoi/robo-genero](https://github.com/generoi/robo-genero) package.
- Atomic deploys using [Deployer](https://deployer.org/) and our [generoi/deployer-genero](https://github.com/generoi/deployer-genero) package.
- Composer tasks for building and linting the project. If needed you can customize these for your project.
- [DDEV](https://ddev.readthedocs.io/) local development environment.
- [GitHub actions](https://github.com/generoi/bedrock/tree/master/.github/workflows) for deploying, linting, e2e and lighthouse.
- Bundled opinionated [sage fork](https://github.com/generoi/bedrock/tree/master/web/app/themes/gds) using laravel mix
- Automatic production/staging `.env` environment detection on Kinsta
- Various [mu-plugins](https://github.com/generoi/bedrock/tree/master/web/app/mu-plugins) to increase security and set sane defaults.

## Requirements

- PHP 8.0 - [Installation](https://formulae.brew.sh/formula/php@8.0)
- Composer - [Installation](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)
- DDEV - [Installation](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/)
- Prettier - [Installation](https://prettier.io/docs/en/editors.html)
- EditorConfig - [Installation](https://editorconfig.org/#download)

### Authenticate with satispress

You will need to create a user-specific API key on satispress.generodigital.com. Note that the API key is used as the username and the password is always `satispress`.

    composer config --global http-basic.satispress.generodigital.com <API-KEY> satispress

### Authenticate with fontawesome registry

You will need an authentication token, we have a shared one added to LastPass/1Password.

    npm config set "//npm.fontawesome.com/:_authToken" <API-KEY>

### Suggested extensions for Visual Studio Code

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
- [PHP Debug](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug)
- [laravel-blade](https://marketplace.visualstudio.com/items?itemName=cjhowe7.laravel-blade)
- [Laravel Pint](https://marketplace.visualstudio.com/items?itemName=open-southeners.laravel-pint)

## Local project development with DDEV

_If you are on Windows you should read the latest DDEV documentation and recommendations for getting things running. You'll need to run all composer, npm, robo and dep commands from within the DDEV container. Remember to send your SSH keys to container using `ddev auth ssh`_

### Setup and run project

    # Clone the repository and install the development dependencies.
    git clone --recursive git@github.com:generoi/bedrock.git gdsbedrock
    cd gdsbedrock

    # Install composer dependencies and development tools (vendor folder)
    composer install:development

    # Build and watch theme assets from your host computer (macOS/linux)
    cd web/app/themes/gds
    npm run build
    npm run build:production
    npm run start

    # Note that if use Windows or otherwise want to run commands from within the
    # container, you need to use `start:poll` instead of `start`
    npm run start:poll

    # Start the container
    ddev start

    # Fetch the remote database
    ./vendor/bin/robo db:pull @production

    # Login as admin
    ddev wp login create <user>

Additional useful tasks

    # Fetch the remote files (we also use a nginx fallback redirect for missing
    # files)
    ./vendor/bin/robo files:pull @production

    # Importing database from a sql dump
    ddev import-db < dump.sql

    # Create a database dump and import it
    ./vendor/bin/robo db:export @ddev
    ./vendor/bin/robo db:import @ddev

    # Run tests which also prompts attempt to fix lint errors automatically.
    ./vendor/bin/robo test

    # To see all tasks available
    ./vendor/bin/robo
    ./vendor/bin/dep
    ./vendor/bin/wp

### Deploying with GitHub actions

Go to [GitHub Actions deploy_production.yml](https://github.com/generoi/gdsbedrock/actions/workflows/deploy_production.yml) workflow and trigger a deploy.

You can also trigger the workflows from the command line.

```sh
./vendor/bin/robo deploy:production
./vendor/bin/robo deploy:staging --branch=patch-1
./vendor/bin/robo deploy:staging --log_level='-vvv'

# You can still use `dep` directly like described in the section below
./vendor/bin/dep cache:clear production
```

### Deploying from local

See [deployer-genero](https://github.com/generoi/deployer-genero) and run `./vendor/bin/dep` to see all available commands.

```sh
# Deploy to staging/production
./vendor/bin/dep deploy staging
./vendor/bin/dep deploy production

# Clear all caches on production
./vendor/bin/dep cache:clear production
# Clear only WP Super Cache cache
./vendor/bin/dep cache:clear:wpsc production

# Open a shell on production server
./vendor/bin/dep ssh production

# Rollback a failed deploy
./vendor/bin/dep rollback production
```

## Create a new project and Git repository

_NOTE: If possible set the project name and repo name to use the domain name of the website. Example: `www.my-site.fi` => `my-site`. This will help with configuring all the different environments in the future._

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

2. Setup the DDEV container

   ```sh
   ddev start
   ```

3. Setup the staging/production environment

   ```sh
   # Configure the environment
   vim wp-cli.yml
   vim robo.yml

   # Prep the remote environment
   ./vendor/bin/dep setup staging

   # Make a first deployment (this will fail due to there not being any database)
   ./vendor/bin/dep setup staging

   # Deploy your code, files and database
   ./vendor/bin/robo db:push @staging
   ./vendor/bin/robo files:push @staging

   # Deploy once more with database available
   ./vendor/bin/dep deploy staging
   ```

4. Setup the GitHub actions, E2E tests etc.
