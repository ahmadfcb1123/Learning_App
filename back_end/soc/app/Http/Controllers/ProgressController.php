<?php

namespace App\Http\Controllers;

use App\Models\chapter;
use App\Models\student;
use App\Models\Practice;
use App\Models\progress;

class ProgressController extends Controller
{

    public function saveProgress($studentId,$chapterId,$skill,$questionId){
        $chapter=chapter::find($chapterId);
        $student=student::find($studentId);
        if ($skill == 'Listening') {
            $Qid = $chapter->listeningQuestion()->find($questionId)->_id;
        } else if ($skill == 'Reading') {
            $Qid = $chapter->ReadingQuestion()->find($questionId)->_id;
        } else if ($skill == 'Grammer') {
            $Qid = $chapter->GrammerQuestion()->find($questionId)->_id;
        }
        $existed=progress::where('question_id',$questionId)->where('student_id',$studentId)->count();
        if ($existed == 0) {
        $prog=progress::create([
            'skill'=>$skill,
            'question_id'=>$Qid
        ]);

        $prog->save();
        $chapter->progress()->save($prog);
        $student->progress()->save($prog);
        }

        return response()->json(['data' => $existed], 200);
    }


    public function isSkillDone($studentId,$chapterId,$skill){
        $progressInSkill=progress::where('chapter_id',$chapterId)->where('skill',$skill)->where('student_id',$studentId)->count();
        $numOfQuestionInSkill=$this->getNumberOfQuestion($chapterId,$skill);
        if ($progressInSkill == $numOfQuestionInSkill) {
            //return response()->json(['data' => true], 200);
            return true;
        }else{
            //return response()->json(['data' => false], 200);
            return false;
        }


    }



    public function isChapterDone($studentId,$chapterId){
    $skills=["Listening","Reading","Grammer"];
    $count=0;
    foreach ($skills as $key ) {
        if ($this->isSkillDone($studentId,$chapterId,$key)==true) {
            $count++;
        }

    }
    if ($count==count($skills)) {
        //return response()->json(['data' => true], 200);
        return true;
    }else{
        //return response()->json(['data' =>false], 200);
        return false;
    }

    }




    public function getDoneChapters($studentId){
    $chapters=chapter::all();
    $d=[];
    foreach ($chapters as $key ) {
        if ($this->isChapterDone($studentId,$key->_id)) {
            array_push($d,$key->_id);
        }
    }
    return response()->json(['data' =>$d], 200);
    }





    public function getChatperProgress($id)
    {
        $progress = Practice::where('chapter_id', $id)->get();
        $i = 0;
        foreach ($progress as $key) {
            if ($key->isCorrect == "false" && $key->skill == "Listening") {
                $i++;
            }
        }
        return response()->json(['data' => $i], 200);
    }
    // public function isSkillDone($skill, $chapterId,$studentId)
    // {
    //     $progress = practice::where('chapter_id', $chapterId)->where('skill', $skill)->where('student_id', $studentId)->get();
    //     $questions=$this->getQuestionsForSkillAndChapter($skill,$chapterId);
    //     $i =[];
    //     $k=0;
    //     $d="0";
    //     foreach ($questions as $key) {
    //         foreach ($progress as $key1) {
    //              if ($key1->score ==$key1->totalScore) {
    //                     array_push($i,$key1) ;
    //                 $k=$key1;
    //                 //$k=$key->Question[0]->_id;
    //              }
    //             }
    //     }




    //     return response()->json(['data' => $k], 200);
    // }
    public function getTypeOfQuestionsForSkillAndChapter($skill, $chapterId)
    {
        $chapter = chapter::find($chapterId);
        $questions=$this->getQuestionsForSkillAndChapter($skill,$chapterId);
        $type=[];
        foreach ($questions as $key) {
            if (!in_array($key->type,$type)) {
            array_push($type,$key->type);
            }
        }

        return response()->json(['data' => $type], 200);
    }

    public function getQuestionsForSkillAndChapter($skill, $chapterId)
    {
        $chapter = chapter::find($chapterId);
        if ($skill == 'Listening') {
            $questions=$chapter->listeningQuestion()->get();
            return $questions;
        }
        if ($skill == 'Reading') {
            $questions=$chapter->ReadingQuestion()->get();
            return $questions;
        }
        if ($skill == 'Grammer') {
            $questions=$chapter->GrammerQuestion()->get();
            return $questions;
        }
    }


    public function getNumberOfQuestion($chapterId,$skill)
    {
        $chapter = chapter::find($chapterId);
        if ($skill == 'Listening') {
            $questions=$chapter->listeningQuestion()->count();
            return $questions;
        }
        if ($skill == 'Reading') {
            $questions=$chapter->ReadingQuestion()->count();
            return $questions;
        }
        if ($skill == 'Grammer') {
            $questions=$chapter->GrammerQuestion()->count();
            return $questions;
        }
    }

}
