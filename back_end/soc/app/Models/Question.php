<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
class Question extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'writingQuestion';
    protected $fillable = [
        'text', 'is_correct'
    ];
}
