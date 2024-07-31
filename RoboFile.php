<?php

if (file_exists($composer = __DIR__.'/vendor/autoload.php')) {
    require_once $composer;
}

// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace
class RoboFile extends \Robo\Tasks
{
    use \Generoi\Robo\Command\loadCommands;

    // phpcs:enable
    use \Generoi\Robo\Task\loadTasks;

    /**
     * Pull uploads directory from remote to local.
     *
     * @param  string  $source  Source alias eg. `production`
     * @return \Robo\Result
     */
    public function filesPull(string $source, $options = ['exclude' => null, 'dry-run' => false, 'options' => null])
    {
        return $this->rsyncPull("{$source}:%files", $options);
    }

    /**
     * Push uploads directory from local to remote.
     *
     * @param  string  $destination  Destination alias eg. `production`
     * @return \Robo\Result
     */
    public function filesPush(string $destination, $options = ['exclude' => null, 'dry-run' => true, 'options' => null])
    {
        return $this->rsyncPush("{$destination}:%files", $options);
    }

    // You can override common tasks by overloading their functions in this file. Eg.
    //
    //   public function buildDevelopment($options = ['npm-script' => 'build'])
    //   public function buildProduction($options = ['npm-script' => 'build:production'])
    //   public function installDevelopment()
    //   public function installProduction()
    //   public function deployProduction()
    //   public function deployStaging()
}
