<?php

namespace App\Models;

use App\Models\chatMessage;
use App\Models\chatParticipants;
//use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class chat extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'chats';
    public function participants(){
        return $this->hasMany(chatParticipants::class);
    }
    public function messages(){
        return $this->hasMany(chatMessage::class);
    }
    public function lastMessage(){
        return $this->hasOne(chatMessage::class)->latest('updated_at');
    }
}
