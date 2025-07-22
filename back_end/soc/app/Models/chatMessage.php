<?php

namespace App\Models;

use App\Models\chat;
//use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class chatMessage extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'chat_messages';
    public function Users(){
        return $this->belongsTo(User::class)->latest('updated_at');
    }
    public function chat(){
        return $this->belongsTo(chat::class)->latest('updated_at');
    }
}
