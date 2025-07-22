<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class ch extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'ches';
    protected $fillable = [
        'name',
        'progressChapter',
        'parent_id'
        
    ];
}
