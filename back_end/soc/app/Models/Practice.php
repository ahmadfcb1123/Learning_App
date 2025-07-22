<?php

namespace App\Models;

use App\Models\chapter;
//use Illuminate\Database\Eloquent\Model;
use App\Models\Question\Question;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Question\MultipleChoiceQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Practice extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'Practice';
    protected $fillable = [
        '_id',
        'chapter_id',
        'student_id',
        'skill_type',
        'question_type',
        'answer',
        'question',
        'answer_state',
        'score',
        'total_score',
        'Question_number',
    ];

    public function Question()
    {
        return $this->embedsMany(Question::class);
    }
}
