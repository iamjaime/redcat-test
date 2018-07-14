<?php

namespace App\Contracts;


interface RedcatRepositoryContract {

    /**
     * Handles parsing the imported CSV file
     *
     * @param $file
     * @return mixed
     */
    function parseCSV($file);

}