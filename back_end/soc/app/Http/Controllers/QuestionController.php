<?php

namespace App\Http\Controllers;

use App\Models\chapter;
use Illuminate\Http\Request;
use App\Models\skills\GrammerQuestion;
use App\Models\skills\ReadingQuestion;
use App\Models\Question\QuestionFactory;

class QuestionController extends Controller
{
    public function addGrammerReorder($id,$type)
    {
        $chapter=chapter::find($id);
        $words=['is','What','brother’s','name?','your'];
        $words2=['name','His','john','is'];
        $words3=['short','is','He'];
        $words4=['has','He','got','hair','black'];


        $answer=['What','is','your','brother’s','name?'];
        $answer2=['His','name','is','john'];
        $answer3=['He','is','short'];
        $answer4=['He','has','got','black','hair'];

        $data=['qtext'=>'Reorder the folowing word :','words'=>$words,'answer'=>$answer];
        $data2=['qtext'=>'Reorder the folowing word :','words'=>$words2,'answer'=>$answer2];
        $data3=['qtext'=>'Reorder the folowing word :','words'=>$words3,'answer'=>$answer3];
        $data4=['qtext'=>'Reorder the folowing word :','words'=>$words4,'answer'=>$answer4];
        //$question=new MultipleChoiceQuestion($data);
        $question=QuestionFactory::createProduct($type,$data4);
        $question2=QuestionFactory::createProduct($type,$data3);
        $question3=QuestionFactory::createProduct($type,$data2);
        $question4=QuestionFactory::createProduct($type,$data);
        $grammer=new GrammerQuestion([
            'type'=>'Reorder',
        ]);
        //$WritingQuestion->Question()->save();
        $grammer->save();
        $grammer->Question()->save($question);
        $grammer->Question()->save($question2);
        $grammer->Question()->save($question3);
        $grammer->Question()->save($question4);
        $chapter->GrammerQuestion()->save($grammer);
        return response()->json(['data'=>$grammer->questions],200);
    }

    public function findGrammerQuestion($id){
        $chapter=chapter::find($id);
        $q=$chapter->GrammerQuestion()->get();
        return response()->json(['data'=>$q],200);
    }

        public function findReadingQuestion($id){
        $chapter=chapter::find($id);
        $q=$chapter->ReadingQuestion()->get();
        return response()->json(['data'=>$q],200);
    }


    // public function addGrammerChoices ($id,$type)
    // {
    //     $chapter=chapter::find($id);
    //     $choices=['is','am','are'];
    //     $data=['qtext'=>'choose one of the word:','firstSentences'=>'Lana and Zein','seconedSentences'=>'at the supermarket','choices'=>$choices,'answer'=>'are'];
    //     $data1=['qtext'=>'choose one of the word:','firstSentences'=>'Jad and Luna','seconedSentences'=>'in the same class.','choices'=>$choices,'answer'=>'are'];
    //     $data2=['qtext'=>'choose one of the word:','firstSentences'=>'Zein','seconedSentences'=>'from Tunis.','choices'=>$choices,'answer'=>'is'];
    //     $data3=['qtext'=>'choose one of the word:','firstSentences'=>'I','seconedSentences'=>'ten years old.','choices'=>$choices,'answer'=>'am'];
    //     $data4=['qtext'=>'choose one of the word:','firstSentences'=>'The dog','seconedSentences'=>'in the park','choices'=>$choices,'answer'=>'is'];
    //     //$question=new MultipleChoiceQuestion($data);
    //     $question=QuestionFactory::createProduct($type,$data);
    //     $question1=QuestionFactory::createProduct($type,$data1);
    //     $question2=QuestionFactory::createProduct($type,$data2);
    //     $question3=QuestionFactory::createProduct($type,$data3);
    //     $question4=QuestionFactory::createProduct($type,$data4);
    //     $grammer=new GrammerQuestion([
    //         'name' =>' ahmad',
    //         'type'=>'MultipleChoice',
    //     ]);
    //     //$WritingQuestion->Question()->save();
    //     $grammer->save();
    //     $grammer->Question()->save($question);
    //     $grammer->GrammerQuestion()->save($grammer);
    //     return response()->json(['data'=>$grammer->questions],200);
    // }





    // public function addReadingQuestion($id,$type){
    //     $chapter=chapter::find($id);
    //     $choices=['true','false'];
    //     $data=['qtext'=>'true or false :','firstSentences'=>'i','seconedSentences'=>'Ahmed is from Syria. ','choices'=>$choices,'answer'=>'false'];
    //     $data1=['qtext'=>'true or false','firstSentences'=>'i','seconedSentences'=>'Adam and Allan are in Ahmed s class.','choices'=>$choices,'answer'=>'true'];
    //     $data2=['qtext'=>'true or false','firstSentences'=>'i','seconedSentences'=>'Ahmed s mother is a teacher.','choices'=>$choices,'answer'=>'true'];
    //     //$question=new MultipleChoiceQuestion($data);
    //     $question=QuestionFactory::createProduct($type,$data);
    //     $question1=QuestionFactory::createProduct($type,$data1);
    //     $question2=QuestionFactory::createProduct($type,$data2);
    //     $listen=new ReadingQuestion([
    //         'name' =>' ahmad',
    //         'type'=>'MultipleChoice',
    //     ]);
    //     //$WritingQuestion->Question()->save();
    //     $listen->save();
    //     $listen->Question()->save($question);
    //     $listen->Question()->save($question1);
    //     $listen->Question()->save($question2);
    //     $chapter->ReadingQuestion()->save($listen);
    //     return response()->json(['data'=>$listen->questions],200);
    // }


    // public function addReadingQuestion($id,$type)
    // {
    //     $chapter=chapter::find($id);
    //     $text = 'Hello my friends.I m Ahmed. I m ten years old, and I m in grade 4. I m fromLebanon, but I live in Syria. My father is a doctor and my mother is a teacher. I ve got two little brothers, Adam and Allan. They are twins. We are all in the same school. It is a very big school.';
    //     $choices =['true','false'];
    //     $data=['qtext'=>'Ahmed is from Syria.','choices'=>$choices,'answer'=>'false'];
    //     $data1=['qtext'=>'Adam and Allan are in Ahmed class.','choices'=>$choices,'answer'=>'true'];
    //     $data2=['qtext'=>'Ahmed’s mother is a teacher.','choices'=>$choices,'answer'=>'true'];
    //     //$question=new MultipleChoiceQuestion($data);
    //     $question=QuestionFactory::createProduct($type,$data);
    //     $question1=QuestionFactory::createProduct($type,$data1);
    //     $question2=QuestionFactory::createProduct($type,$data2);
    //     $read=new ReadingQuestion([
    //         'type'=>'TrueFalse',
    //     ]);
    //     //$WritingQuestion->Question()->save();
    //     $read->save();
    //     $read->Question()->save($question);
    //     $read->Question()->save($question1);
    //     $read->Question()->save($question2);
    //     $chapter->ReadingQuestion()->save($read);
    //     return response()->json(['data'=>$read->questions],200);
    // }



    public function addGrammerChoices($id,$type){
        $chapter=chapter::find($id);
        $choices=['is','has got'];
        $data=['qtext'=>'Fill in the spaces with:','firstSentences'=>'She','seconedSentences'=>'long hair','choices'=>$choices,'answer'=>'has got'];
        $data1=['qtext'=>'Fill in the spaces with:','firstSentences'=>'He','seconedSentences'=>'tall and thin','choices'=>$choices,'answer'=>'is'];
        $data2=['qtext'=>'Fill in the spaces with:','firstSentences'=>'My grandmother’s hair','seconedSentences'=>'white.','choices'=>$choices,'answer'=>'is'];
        //$question=new MultipleChoiceQuestion($data);
        $question=QuestionFactory::createProduct($type,$data);
        $question1=QuestionFactory::createProduct($type,$data1);
        $question2=QuestionFactory::createProduct($type,$data2);
        $listen=new GrammerQuestion([
            'name' =>' ahmad',
            'type'=>'MultipleChoice',
        ]);
        //$WritingQuestion->Question()->save();
        $listen->save();
        $listen->Question()->save($question);
        $listen->Question()->save($question1);
        $listen->Question()->save($question2);
        $chapter->GrammerQuestion()->save($listen);
        return response()->json(['data'=>$listen->questions],200);
    }

}
