<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class chatParticipants extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'chat_participants';
    public function user(){
        return $this->belongsTo(User::class)->latest('updated_at');
    }
}
