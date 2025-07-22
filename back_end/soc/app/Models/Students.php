<?php

namespace App\Models;

use App\Models\Practice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Students extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'Students';
    protected $fillable = [
        'Firstname',
        'Lastname',
        'code',
        'progressChapter',
        'password',
        'fatherName',
    ];

    public function practices(){
        return $this->hasMany(Practice::class);
    }
}


