<?php

namespace App\Http\Controllers;
use App\Models\chapter;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Models\WritingQuestion;
use Illuminate\Support\Facades\Auth;
use App\Models\skills\ReadingQuestion;
use App\Models\skills\SpeakingQuestion;
use App\Models\Question\QuestionFactory;
use App\Models\skills\ListeningQuestion;
use App\Models\Question\MultipleChoiceQuestion;
use Illuminate\Support\Facades\Storage;


class chapterController extends Controller
{
    public function getAll(){
        $chapter=chapter::all();
        $user=Auth::user();
        if ($user) {
            return response()->json(['data'=>$chapter],200);
        }
        else{
            return response()->json(['message'=>'user not authencated'],400);
        }
    }

    public function getbyid($id=null){
        if ($id==null) {
            return response()->json(['status'=>false,'message'=>'false']);
        }
        $chapter=chapter::find($id);
        $user=Auth::user();
        if ($user) {
            return response()->json(['data'=>$chapter],200);
        }else{
            return response()->json(['message'=>'user not authencated'],400);
        }
    }

    public function getbytitle($title){
        $chapter=chapter::where('title',$title)->get();
        return response()->json(['data'=>$chapter],200);
    }

    // public function getChapterImage(){
    //     return response()->file(public_path('storage/images/chapter1.png'));
    //     return response()->file(public_path('storage/images/chapter2.jpg'));
    //     return response()->file(public_path('storage/images/chapter3.jpg'));
    // }


    // public function getq2ch($id){
    //     $chapter=chapter::find($id);
    //     $question=ListeningQuestion::where('chapterId',$id)->get();
    //     return response()->json(['data'=>$question],200);
    // }

    // public function addlistenquestion($id){
    //     $chapter=chapter::find($id);
    //     $listen=new ListeningQuestion([
    //         'name' =>'ali',
    //         'type'=>'matching',
    //     ]);
    //     $chapter->listeningQuestion()->save($listen);
    //     return response()->json(['data'=>''],200);
    // }
    // public function returnlistenquestionfromchapter($id){
    //     $chapter=chapter::find($id);
    //     $listen=new ListeningQuestion([
    //         'name' =>'ali',
    //     ]);
    //     $q=$chapter->listeningQuestion()->get();
    //     return response()->json(['data'=>$q],200);
    // }

    // public function returnReadenquestionfromchapter($id){
    //     $chapter=chapter::find($id);
    //     $listen=new ListeningQuestion([
    //         'name' =>'ali',
    //     ]);
    //     $q=$chapter->listeningQuestion()->get();
    //     return response()->json(['data'=>$q],200);
    // }

    // public function addwritingquestion($id){
    //     $chapter=chapter::find($id);
    //     $question=new Question(['text'=>'paris','is_correct'=>'true']);
    //     $writing=new WritingQuestion([
    //         'name' =>' hello ali',
    //         'type'=>'matching',
    //     ]);
    //     //$WritingQuestion->Question()->save();

    //     $writing->save();
    //     $writing->Question()->save($question);
    //     $chapter->writingQuestion()->save($writing);
    //     return response()->json(['data'=>$writing->questions],200);
    // }
    // public function findwritingquestion($id){
    //     $chapter=chapter::find($id);
    //     $q=$chapter->writingQuestion()->get();
    //     return response()->json(['data'=>$q],200);
    // }

    public function addListeningQuestion($id,$type){
        $chapter=chapter::find($id);
        $choices=['is','am','are'];
        $data=['qtext'=>'choose one of the word:','firstSentences'=>'you','seconedSentences'=>'from jablah','choices'=>$choices,'answer'=>'are'];
        $data1=['qtext'=>'choose one of the word:','firstSentences'=>'i','seconedSentences'=>'from Dam','choices'=>$choices,'answer'=>'am'];
        $data2=['qtext'=>'choose one of the word:','firstSentences'=>'he','seconedSentences'=>'from syria','choices'=>$choices,'answer'=>'is'];
        //$question=new MultipleChoiceQuestion($data);
        $question=QuestionFactory::createProduct($type,$data);
        $question1=QuestionFactory::createProduct($type,$data1);
        $question2=QuestionFactory::createProduct($type,$data2);
        $listen=new ListeningQuestion([
            'name' =>' ahmad',
            'type'=>'MultipleChoice',
        ]);
        //$WritingQuestion->Question()->save();
        $listen->save();
        $listen->Question()->save($question);
        $listen->Question()->save($question1);
        $listen->Question()->save($question2);
        $chapter->ListeningQuestion()->save($listen);
        return response()->json(['data'=>$listen->questions],200);
    }

    public function addListeningQReorder($id,$type){
        $chapter=chapter::find($id);
        $words=['How’re you?',
        'Good morning.',
        'I’m fine thanks, and you?',
        'Good morning, Luna.'];

        $words2=['Hi, my name’s Robin.',
        'Nice to meet you too.',
        'Hi, I’m Paul. What’s your name?',
        'Nice to meet you Robin.'];

        $words3=['Hello, Wissam.',
        'I’m doing well, and you?',
        'How’re you doing?',
        'Hello, Suzan.'];

        $answer=['Good morning, Luna.',
        'Good morning.',
        'How’re you?' ,
        'I’m fine thanks, and you?'];

        $answer2=['Hi, I’m Paul. What’s your name?',
        'Hi, my name’s Robin.',
        'Nice to meet you Robin.' ,
        'Nice to meet you too.'];

        $answer3=['Hello, Wissam.',
        'Hello, Suzan.',
        'How’re you doing?' ,
        'I’m doing well, and you?'];
        $data=['qtext'=>'Reorder the folowing word :','words'=>$words,'answer'=>$answer];
        $data2=['qtext'=>'Reorder the folowing word :','words'=>$words2,'answer'=>$answer2];
        $data3=['qtext'=>'Reorder the folowing word :','words'=>$words3,'answer'=>$answer3];
        // $data2=['qtext'=>'Reorder the folowing word :','words'=>$words2,'answer'=>$answer2];
        //$question=new MultipleChoiceQuestion($data);
        $question=QuestionFactory::createProduct($type,$data);
        $question2=QuestionFactory::createProduct($type,$data2);
        $question3=QuestionFactory::createProduct($type,$data3);
        // $question2=QuestionFactory::createProduct($type,$data2);
        $listen=new ListeningQuestion([
            'type'=>'Reorder',
        ]);
        //$WritingQuestion->Question()->save();
        $listen->save();
        $listen->Question()->save($question);
        $listen->Question()->save($question2);
        $listen->Question()->save($question3);
        // $listen->Question()->save($question2);
        $chapter->ListeningQuestion()->save($listen);
        return response()->json(['data'=>$listen->questions],200);
    }
    public function findListenQuestion($id){
        $chapter=chapter::find($id);
        $q=$chapter->ListeningQuestion()->get();
        return response()->json(['data'=>$q],200);
    }

    public function findSpeakingQuestion($id){
        $chapter=chapter::find($id);
        $q=$chapter->SpeakingQuestion()->get();
        return response()->json(['data'=>$q],200);
    }


    //     public function addReadingQuestion($id,$type){
    //     $chapter=chapter::find($id);
    //     $text='Hello my friends.
    //     I’m Ahmed. I’m ten years old, and I’m in grade 4. I’m from
    //     Lebanon, but I live in Syria. My father is a doctor and my mother
    //     is a teacher. I’ve got two little brothers, Adam and Allan. They
    //     are twins. We are all in the same school. It is a very big school.';
    //     $choices=['true','false'];
    //     $data=['qtext'=>'true or false :','firstSentences'=>'Ahmed is from Syria. ','seconedSentences'=>'','choices'=>$choices,'answer'=>'false'];
    //     $data1=['qtext'=>'true or false','firstSentences'=>'Adam and Allan are in Ahmed`s class.','seconedSentences'=>'','choices'=>$choices,'answer'=>'true'];
    //     $data2=['qtext'=>'true or false','firstSentences'=>'Ahmed `s mother is a teacher.','seconedSentences'=>'','choices'=>$choices,'answer'=>'true'];
    //     //$question=new MultipleChoiceQuestion($data);
    //     $question=QuestionFactory::createProduct($type,$data);
    //     $question1=QuestionFactory::createProduct($type,$data1);
    //     $question2=QuestionFactory::createProduct($type,$data2);
    //     $listen=new ReadingQuestion([
    //         'type'=>'MultipleChoice',
    //         'text'=> $text,
    //     ]);
    //     //$WritingQuestion->Question()->save();9*
    //     $listen->save();
    //     $listen->Question()->save($question);
    //     $listen->Question()->save($question1);
    //     $listen->Question()->save($question2);
    //     $chapter->ReadingQuestion()->save($listen);
    //     return response()->json(['data'=>$listen->questions],200);
    // }



    ///////// public function findListenQuestionOnnumber($number){
    //     ///////$chapter = chapter::whare('number',$number)->get();
    //     //////$q=$chapter->ListeningQuestion()->get();
    //     return response()->json(['data'=>$q],200);
    // }
    // public function findListenQuestionByTitle($title){
    //     $chapter=chapter::find($id);
    //     $q=$chapter->ListeningQuestion()->get();
    //     return response()->json(['data'=>$q],200);
    // }


    public function addReadingQuestion($id,$type){
        $chapter=chapter::find($id);
        $text='Hello my friends.
        I am Ahmed. I am ten years old, and I am in grade 4. I am from
        Lebanon, but I live in Syria. My father is a doctor and my mother
        is a teacher. I have got two little brothers, Adam and Allan. They
        are twins. We are all in the same school. It is a very big school.';
        $choices=['True','False'];
        $data=['qtext'=>'Tick True or False:','firstSentences'=>'1. Ahmed is from Syria.','seconedSentences'=>'','choices'=>$choices,'answer'=>'False'];
        $data1=['qtext'=>'Tick True or False:','firstSentences'=>'2.Adam and Allan are in Ahmed`s class.','seconedSentences'=>'','choices'=>$choices,'answer'=>'True'];
        $data2=['qtext'=>'Tick True or False:','firstSentences'=>'3. Ahmed`s mother is a teacher','seconedSentences'=>'','choices'=>$choices,'answer'=>'True'];
        //$question=new MultipleChoiceQuestion($data);
        $question=QuestionFactory::createProduct($type,$data);
        $question1=QuestionFactory::createProduct($type,$data1);
        $question2=QuestionFactory::createProduct($type,$data2);
        $listen=new ReadingQuestion([
            'name' =>' ahmad',
            'type'=>'MultipleChoice',
            'text'=>$text,
        ]);
        //$WritingQuestion->Question()->save();
        $listen->save();
        $listen->Question()->save($question);
        $listen->Question()->save($question1);
        $listen->Question()->save($question2);
        $chapter->ReadingQuestion()->save($listen);
        return response()->json(['data'=>$listen->questions],200);
    }

    public function getChapterImage($id){
        $chapter=chapter::find($id);
        $path=$chapter->imageUrl;
        return response()->file(public_path($path));
    }

    public function getQuestionImage($skill,$Qid,$chapterId){
        $chapter=chapter::find($chapterId);
        if ($skill=='Listening') {
            $path=$chapter->listeningQuestion()->find($Qid)->imageUrl;
            return response()->file(public_path($path));
        }
        else if ($skill=='Reading') {
            $path=$chapter->ReadingQuestion()->find($Qid)->imageUrl;
            return response()->file(public_path($path));
        }
        else if ($skill=='Grammer') {
            $path=$chapter->GrammerQuestion()->find($Qid)->imageUrl;
            return response()->file(public_path($path));
        }
    }

    // public function addSpeakingQuestion($id,$type){
    //     $chapter=chapter::find($id);
    //     $choices=['is','am','are'];
    //     $data=['questionText'=>'pronunciation of this words','imageUrl'=>'storage/QuestionsImage/SpeakingImage/speaking11.jpg','word'=>'hour'];
    //     $data1=['questionText'=>'pronunciation of this words','imageUrl'=>'storage/QuestionsImage/SpeakingImage/speaking12.jpg','word'=>'white'];
    //     $data2=['questionText'=>'pronunciation of this words','imageUrl'=>'storage/QuestionsImage/SpeakingImage/speaking13.jpg','word'=>'Vegetable'];
    //     $data3=['questionText'=>'pronunciation of this words','imageUrl'=>'storage/QuestionsImage/SpeakingImage/speaking14.jpg','word'=>'bridge'];
    //     //$question=new MultipleChoiceQuestion($data);
    //     $question=QuestionFactory::createProduct($type,$data);
    //     $question1=QuestionFactory::createProduct($type,$data1);
    //     $question2=QuestionFactory::createProduct($type,$data2);
    //     $question3=QuestionFactory::createProduct($type,$data3);
    //     $listen=new SpeakingQuestion([
    //         'name' =>' ahmad',
    //         'type'=>'Matching',
    //     ]);
    //     //$WritingQuestion->Question()->save();
    //     $listen->save();
    //     $listen->Question()->save($question);
    //     $listen->Question()->save($question1);
    //     $listen->Question()->save($question2);
    //     $listen->Question()->save($question3);
    //     $chapter->SpeakingQuestion()->save($listen);
    //     return response()->json(['data'=>$listen->questions],200);
    // }

    public function addSpeakingQuestion($id, $type)
{
    $chapter = chapter::find($id);
    $choices = ['is', 'am', 'are'];
    $data = [
        'questionText' => 'pronunciation of this words',
        'imageUrl' => 'storage/QuestionsImage/SpeakingImage/speaking11.jpg',
        'word' => 'hour'
    ];
    $data1 = [
        'questionText' => 'pronunciation of this words',
        'imageUrl' => 'storage/QuestionsImage/SpeakingImage/speaking12.jpg',
        'word' => 'white'
    ];
    $data2 = [
        'questionText' => 'pronunciation of this words',
        'imageUrl' => 'storage/QuestionsImage/SpeakingImage/speaking13.jpg',
        'word' => 'Vegetable'
    ];
    $data3 = [
        'questionText' => 'pronunciation of this words',
        'imageUrl' => 'storage/QuestionsImage/SpeakingImage/speaking14.jpg',
        'word' => 'bridge'
    ];

    $question = QuestionFactory::createProduct($type, $data);
    $question1 = QuestionFactory::createProduct($type, $data1);
    $question2 = QuestionFactory::createProduct($type, $data2);
    $question3 = QuestionFactory::createProduct($type, $data3);

    $listen = new SpeakingQuestion([
        'name' => 'ahmad',
        'type' => 'Matching'
    ]);

    $listen->save();
    $listen->questions()->saveMany([$question, $question1, $question2, $question3]);

    $chapter->SpeakingQuestion()->save($listen);

    return response()->json(['data' => $listen->questions], 200);
}



// public function getSentencesImage($id, $questionId)
// {
//     $listen = SpeakingQuestion::findOrFail($id);
//     $question = $listen->questions()->find($questionId);

//     if ($question) {
//         $imagePath = Storage::path($question->imageUrl);
//         $fileContents = file_get_contents($imagePath);

//         return response($fileContents, 200)->header('Content-Type', 'image/jpeg');
//     }

//     return response()->json(['error' => 'Question not found.'], 404);
// }


public function getSentencesImage($id, $questionId)
{
    $listen = SpeakingQuestion::findOrFail($id);
    $question = $listen->questions()->find($questionId);

    if ($question) {

        $path=$listen->questions()->find($questionId)->imageUrl;
        return response()->file(public_path($path));
    }

    return response()->json(['error' => 'Question not found.'], 404);
}


}
