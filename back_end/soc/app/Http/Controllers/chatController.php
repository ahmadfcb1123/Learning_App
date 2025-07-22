<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\message;
use App\Http\Requests\GetChatRequest;

class chatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetChatRequest $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function message(Request $request)
    {
        event(new Message($request->input('username'), $request->input('message'),$request->input('id')));
        return [];
    }
}
