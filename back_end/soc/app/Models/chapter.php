<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Auth;
use App\Models\skills\GrammerQuestion;
use App\Models\skills\ReadingQuestion;
use App\Models\skills\WritingQuestion;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\skills\SpeakingQuestion;
use App\Models\skills\ListeningQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class chapter extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'chapter';
    protected $fillable = [
        '_id',
        'title',
        'description',
        'number',
        'imageUrl'
    ];
    public function listeningQuestion(){
        return $this->hasMany(ListeningQuestion::class);
    }

    public function GrammerQuestion(){
        return $this->hasMany(GrammerQuestion::class);
    }

    public function ReadingQuestion(){
        return $this->hasMany(ReadingQuestion::class);
    }

    public function writingQuestion(){
        return $this->hasMany(WritingQuestion::class);
    }

    public function SpeakingQuestion(){
        return $this->hasMany(SpeakingQuestion::class);
    }
}
