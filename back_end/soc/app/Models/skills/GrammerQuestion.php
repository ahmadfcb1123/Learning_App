<?php

namespace App\Models\skills;

use App\Models\chapter;
//use Illuminate\Database\Eloquent\Model;
use App\Models\Question\Question;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GrammerQuestion extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'GrammerQuestion';
    protected $fillable = [
        '_id',
        'name',
        'type',
        'chapterId',
        'question',
        'number',
        'imageUrl',
        'number',
    ];
    public function GrammerQuestion(){
        return $this->belongsTo(chapter::class);
    }
    public function Question()
    {
        return $this->embedsMany(Question::class);
    }

}
