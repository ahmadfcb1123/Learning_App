<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\student;
use App\Models\children;
use Illuminate\Support\Facades\Auth;
class RegisterController extends Controller
{
    public function store(Request $request){
        $input=$request->all();
        $validatedData = $request->validate([
            'name' => ['required'],
            'email' => ['required','unique:student,email','email'],
            'password' => ['required','min:8'],
            'code'=>['required','min:8'],
        ]);
        student::create([
            'name' =>$input['name'],
            'email'=>$input['email'],
            'password'=>$input['password'],
            'code'=>$input['code']
        ]);
        return response()->json(['status'=>true,
        'message'=>'regester success'
    ]);
    }

    
}
