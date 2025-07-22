<?php

namespace App\Http\Controllers;

use App\Events\alert;
use Illuminate\Http\Request;

class alertController extends Controller
{
    public function alert(Request $request){
        $message=$request->message;
        broadcast(new alert($message));
        return "success";
    }
}
