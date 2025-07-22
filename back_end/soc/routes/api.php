<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\chapterController;
use App\Http\Controllers\ChildrenController;
use App\Http\Controllers\PracticeController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\alertController;
use App\Http\Controllers\chatController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/alert', [alertController::class,"alert"]);

Route::post('messages', [\App\Http\Controllers\chatController::class, 'message']);

// Route::post('/register',[RegisterController::class,'store']);
// Route::post('/login',[LoginController::class,'check']);

// Route::get('/chapters',[chapterController::class,'getAll']);
Route::post('/makePractice',[PracticeController::class,'AddPractice']);
Route::get('/image/{id?}',[chapterController::class,'getChapterImage']);
Route::get('/imageQuestion/{skill_type?}/{Question_id?}/{id?}',[chapterController::class,'getQuestionImage']);
Route::get('/getSentencesImage/{Question_id?}/{SId?}',[chapterController::class,'getSentencesImage']);
// Route::get('/getPractices/{id?}',[PracticeController::class,'getPractice']);
Route::get('/AddReorder/{id?}/{type?}',[chapterController::class,'addListeningQReorder']);
Route::get('/AddReorderGrammer/{id?}/{type?}',[QuestionController::class,'addGrammerReorder']);
Route::get('/AddGrammerChoices/{id?}/{type?}',[QuestionController::class,'addGrammerChoices']);
Route::get('/AddSpeakingQuestions/{id?}/{type?}',[chapterController::class,'addSpeakingQuestion']);
// Route::get('/AddReading/{id?}/{type?}',[QuestionController::class,'addReadingQuestion']);

Route::get('/Add/{id?}/{type?}',[chapterController::class,'addListeningQuestion']);
Route::get('/AddReading/{id?}/{type?}',[chapterController::class,'addReadingQuestion']);
// Route::get('/AddReading/{id?}/{type?}',[chapterController::class,'addReadingQuestion']);

Route::get('/getQuestions/Listening/{id?}',[chapterController::class,'findListenQuestion']);
Route::get('/getGrammerQuestions/Grammer/{id?}',[QuestionController::class,'findGrammerQuestion']);
Route::get('/getReadingQuestions/Reading/{id?}',[QuestionController::class,'findReadingQuestion']);
Route::get('/getSpeakingQuestions/Speaking/{id?}',[chapterController::class,'findSpeakingQuestion']);
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::get('/chapters',[chapterController::class,'getAll']);
    // Route::get('/getPractices/{id?}/{type?}',[PracticeController::class,'getPractice']);
    Route::get('/getPractices/{id?}/{type?}/{stud_id?}',[PracticeController::class,'getPracticeOfChild']);
    Route::post('/registerChild',[ChildrenController::class , 'register']);
    Route::post('/loginChild', [ChildrenController::class , 'login']);
    Route::get('/childreens/{id?}', [ChildrenController::class , 'findChidrensOfParent']);

});
