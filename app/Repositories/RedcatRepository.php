<?php

namespace App\Repositories;

use App\Contracts\RedcatRepositoryContract as RedcatContract;
use Maatwebsite\Excel\Facades\Excel;

class RedcatRepository implements RedcatContract
{

    protected $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }

    /**
     * Handles parsing the CSV file
     *
     * @param $file
     * @return array|mixed
     * @throws \League\Csv\Exception
     */
    public function parseCSV($file)
    {
        //load the CSV document from a file path
        $address = __DIR__ . '/../../storage/app/public/' . $file;
        return Excel::load($address, function($reader) {
            //dd($reader);
        })->get();

    }

}
