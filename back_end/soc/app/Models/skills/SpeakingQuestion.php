<?php

namespace App\Models\skills;

use App\Models\chapter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Question\Question;

class SpeakingQuestion extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'SpeakingQuestions';

    protected $fillable = [
        '_id',
        'type',
        'chapterId',
        'question',
    ];

    public function chapter()
    {
        return $this->belongsTo(chapter::class);
    }

    public function questions()
    {
        return $this->embedsMany(Question::class);
    }
}
