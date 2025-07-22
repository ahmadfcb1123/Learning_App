<?php

namespace App\Http\Controllers;
use App\Models\student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LoginController extends Controller
{
    public function check(Request $request){
        $input=$request->all();
        $validatedData = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','min:8'],
        ]);
        $user=student::where('email',$input['email'])->where('password',$input['password'])->count();
        if ($user != 0) {
            return response()->json([
                'status' => true,
                'message' => 's',
            ]);
        } 
        return response()->json(['status'=>false,'message'=>'false']);
        
       
    }
}
