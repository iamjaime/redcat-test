<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\RedcatRepository;

class RedcatController extends Controller
{

    protected $redcat;


    public function __construct(RedcatRepository $redcat)
    {
        $this->redcat = $redcat;
    }

    /**
     * Handles outputting the view
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('redcat');
    }


    /**
     * Handles the file upload
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \League\Csv\Exception
     */
    public function handleUpload(Request $request)
    {
        //lets store the file...
        $file = $request->file('file')->store('csv');
        $csvData = $this->redcat->parseCSV($file);

        return response()->json([
            'success' => false,
            'data' => $csvData
        ], 200);
    }
}
