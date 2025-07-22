<?php

namespace App\Models;

use App\Models\progress;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class progress extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'progress';
    protected $fillable = [
        'skill',
        'question_id'
    ];

}
