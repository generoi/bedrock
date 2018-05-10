<?php

use Robo\Robo;
use Generoi\Robo\Task\loadTasks;
use Generoi\Robo\Command\loadCommands;

class RoboFile extends \Robo\Tasks
{
    use loadTasks;
    use loadCommands;

    /**
     * Pull uploads directory from remote to local.
     *
     * @param  string  $source  Source alias eg. `production`
     * @return \Robo\Result
     */
    public function filesPull(string $source, $options = ['exclude' => null, 'dry-run' => false])
    {
        return $this->rsyncPull("{$source}:%files", $options);
    }

    /**
     * Push uploads directory from local to remote.
     *
     * @param  string  $destination  Destination alias eg. `production`
     * @return \Robo\Result
     */
    public function filesPush(string $destination, $options = ['exclude' => null, 'dry-run' => true])
    {
        return $this->rsyncPush("{$destination}:%files");
    }
}
