<?php

namespace App\Models\Question;

use App\Models\Question\Question;
//use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrueFalseQuestion extends Question
{
    use HasFactory;
    protected $fillable = [
        'qtext','firstSentences','seconedSentences','choices','answer'
    ];
}
