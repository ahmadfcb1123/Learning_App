<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\student;
use Illuminate\Http\Request;

class ChildrenController extends Controller
{

    public function register(Request $request){
        $input=$request->all();
        $validatedData = $request->validate([
            'code'=>['required','min:8'],
            'Firstname'=>['required'],
            'Lastname'=>['required'],
            'parentId'=>['required'],
            'password'=>['required'],
        ]);
        $user=User::find($input['parentId']);
        $studExistBefore=student::where('Firstname',$input['Firstname'])->where('Lastname',$input['Lastname'])->where('fatherName',$user['name'])->count();
        if($user->code == $input['code'] && $studExistBefore==0){
        $student=student::create([
            'Firstname' =>$input['Firstname'],
            'Lastname'=>$input['Lastname'],
            'password'=>$input['password'],
            'fatherName'=>$user['name'],
            'progressChapter'=>'0',
        ]);
        $studentDetail=student::where('Firstname',$input['Firstname'])->where('Lastname',$input['Lastname'])->where('password',$input['password'])->get();
        $user->students()->save($student);
        return response()->json([
        'data'=>$studentDetail,
        'status'=>true,
        'message'=>'regester succes'
        ]);
    }elseif ($studExistBefore!=0) {
        return response()->json(['status'=>409,
        'message'=>'student exist before'
        ]);
    }elseif ($user->code != $input['code']) {
        return response()->json(['status'=>false,
        'message'=>'you have entered a invalid code'
        ]);
    }
        return response()->json(['status'=>false,
        'message'=>'regester failed'
        ]);

    }
    public function login(Request $request){
        $input=$request->all();
        $validatedData = $request->validate([
            'code'=>['required','min:8'],
            'Firstname'=>['required'],
            'Lastname'=>['required'],
            'parentId'=>['required'],
            'password'=>['required','min:8'],
        ]);

        $user=User::find($input['parentId']);
        $student=student::where('Firstname',$input['Firstname'])->where('Lastname',$input['Lastname'])->where('password',$input['password'])->count();
        $studentDetail=student::where('Firstname',$input['Firstname'])->where('Lastname',$input['Lastname'])->where('password',$input['password'])->get();
        if($user->code == $input['code'] && $student !=0){
        return response()->json([
        'data'=>$studentDetail,
        'status'=>true,
        'message'=>'Login succed'
        ]);
    }
        return response()->json(['status'=>false,
        'message'=>'Login failed'
        ]);

    }


    // public function findChidrensOfParent(Request $request){
    //     $input=$request->all();
    //     $user=User::find($input['parentId']);
    //     $stud=$user->students()->get();
    //     if($stud !=null){
    //     return response()->json(['data'=>$stud,
    //     'message'=>'child succed'
    //     ]);
    // }
    //     return response()->json(['status'=>$numOfChild,
    //     'message'=>'no child register for you'
    //     ]);

    // }
    public function findChidrensOfParent(String $parentId){
        $user=User::find($parentId);
        $stud=$user->students()->get();
        if($stud !=null){
        return response()->json(['data'=>$stud,
        'message'=>'child succed'
        ]);
    }
        return response()->json(['status'=>$numOfChild,
        'message'=>'no child register for you'
        ]);

    }



    // public function findParentByEmail(Request $request){
    //     $input=$request->all();
    //     $validatedData = $request->validate([
    //         'code'=>['required','min:8'],
    //         'Firstname'=>['required'],
    //         'Lastname'=>['required'],
    //         'parentId'=>['required'],
    //         'password'=>['required'],
    //     ]);

    //     $user=User::find($input['parentId']);
    //     $stud=student::where('Firstname',$input['Firstname'])->where('Lastname',$input['Lastname'])->where('password',$input['password'])->count();
    //     if($user->code == $input['code'] && $stud !=0){
    //     return response()->json(['status'=>true,
    //     'message'=>'regester succed'
    //     ]);
    // }
    //     return response()->json(['status'=>false,
    //     'message'=>'regester failed'
    //     ]);

    // }

    // public function check(Request $request){
    //     $input=$request->all();
    //     $validatedData = $request->validate([
    //         'name' => ['required'],
    //         'code' => ['required','min:8'],
    //     ]);
    //     $name=ch::where('name',$input['name'])->count();
    //     $user=student::where('code',$input['code'])->count();
    //     if ($user != 0 && $name !=0) {
    //         return response()->json([
    //             'status' => true,
    //             'message' => 's',
    //         ]);
    //     }
    //     return response()->json(['status'=>false,'message'=>'false']);


    // }
}
