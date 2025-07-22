<?php

namespace App\Models\skills;

use App\Models\chapter;
//use Illuminate\Database\Eloquent\Model;
use App\Models\Question\Question;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Question\MultipleChoiceQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ListeningQuestion extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'ListeningQuestions';
    protected $fillable = [
        '_id',
        'type',
        'chapterId',
        'question',
        'number',
        'imageUrl',
        'number'
    ];
    public function ListeningQuestion(){
        return $this->belongsTo(chapter::class);
    }
    public function Question()
    {
        return $this->embedsMany(Question::class);
    }

}
