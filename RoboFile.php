<?php

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

class RoboFile extends \Robo\Tasks
{
    use \Generoi\Robo\Task\loadTasks;
    use \Generoi\Robo\Command\loadCommands;

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
}
