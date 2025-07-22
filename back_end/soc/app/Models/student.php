<?php

namespace App\Models;
//use App\Models\children;

use App\Models\Practice;
//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class student extends Model
{

    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'student';
    protected $fillable = [
        'Firstname',
        'Lastname',
        'code',
        'progressChapter',
        'password',
        'fatherName',
    ];
  //  public function child() {
    //    return $this->hasMany(children::class);
    //}
    public function practices(){
    return $this->hasMany(Practice::class);
}
}
