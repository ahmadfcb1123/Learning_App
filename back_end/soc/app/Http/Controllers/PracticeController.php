<?php

namespace App\Http\Controllers;

use App\Models\chapter;
use App\Models\student;
use App\Models\Practice;
// use Tymon\JWTAuth\Contracts\Providers\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PracticeController extends Controller
{
    public function AddPractice(Request $request)
    {
        $input=$request->all();
        // $user = Auth::user();
        Practice::create([
            'chapter_id' =>$input['chapter_id'],
            'skill_type'=>$input['skill_type'],
            'answer'=>$input['answer'],
            'question_type'=>$input['question_type'],
            'question'=>$input['question'],
            'answer_state'=>$input['answer_state'],
            'student_id'=>$input['student_id'],
            'score'=>$input['score'],
            'total_score'=>$input['total_score'],
            'Question_number'=>$input['Question_number'],
            ]);
        return response()->json([
        'status'=>true,
        'message'=>'Added Done'
    ]);
    }

    // public function getPractice($chapter_id)
    // {
    //     $chapter=Practice::where('chapter_id',$chapter_id)->get();
    //     return response()->json(['data'=>$chapter],200);
    // }


    // public function getPractice($chapter_id,$skill_type)
    // {
    //     $chapter=Practice::where('chapter_id',$chapter_id && 'skill_type', $skill_type)->get();
    //     return response()->json(['data'=>$chapter],200);
    // }

    public function getPractice($chapter_id, $skill_type)
{
    $chapter = Practice::where('chapter_id', $chapter_id)
                    ->where('skill_type', $skill_type)
                    ->get();
    $user=Auth::user();

    if ($chapter->isEmpty()) {
        return response()->json(['error' => 'No practice found.'], 404);
    }

    if ($user) {
        return response()->json(['data'=>$chapter],200);
    }
    else{
        return response()->json(['message'=>'user not authencated'],400);
    }

    return response()->json(['data' => $chapter], 200);
}


public function getPracticeOfChild($chaptId,$skill,$studentId){
    $student=student::find($studentId);
    $studentPractice=$student->practices()->where('chapter_id',$chaptId)->where('skill_type',$skill)->get();
    return response()->json(['data'=>$studentPractice],200);
 }
}
