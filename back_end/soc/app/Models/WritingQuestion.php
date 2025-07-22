<?php

namespace App\Models;
use App\Models\chapter;
use App\Models\Question;
//use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WritingQuestion extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'writingQuestion';
    protected $fillable = [
        '_id',
        'name',
        'type',
        'chapterId',
        'questions',
        
    ];
    public function writingQuestion(){
        return $this->belongsTo(chapter::class);
    }
    public function Question()
    {
        return $this->embedsOne(Question::class);
    }
}
