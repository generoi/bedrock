# gdsbedrock

_See [roots/bedrock](https://github.com/roots/bedrock#readme) readme for notes about the stack._

## Requirements

- PHP 8.0 - [Installation](https://formulae.brew.sh/formula/php@8.0)
- Composer - [Installation](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)
- DDEV - [Installation](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/)
- Prettier - [Installation](https://prettier.io/docs/en/editors.html)
- EditorConfig - [Installation](https://editorconfig.org/#download)

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

    # The repo uses `npm` workspaces so you you should run commands from root of
    # project.
    npm run install
    npm run build:production

    # Start the container
    ddev start

    # Fetch the remote database
    ./vendor/bin/robo db:pull @production

    # Login as admin
    ddev wp login create <user>
    wp @production login create <user>

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

### NPM

    # The root `package.json` delegates all scripts with a `--workspaces` flag
    # so no flags is the same as
    npm run build:production -ws
    npm run build:production -w gds

    # To install/remove a package you need to explicitly add the flag
    npm install postcss-preset-env --save-dev -ws

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

## Testing

### PHPUnit unit tests

Tests require a database so they need to run either in `ddev`, using `wp serve`
or with a local database available.

```sh
ddev composer phpunit
```

### Playwright E2E Tests

```sh
# Install dependencies
npm run e2e:install

# Run against ddev environment
npm run e2e:test

# Run it against production
URL=https://gdsbedrock.kinsta.cloudd npm run e2e:test
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
