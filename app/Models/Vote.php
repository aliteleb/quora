<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function threads()
    {
        return $this->belongsTo(Thread::class);
    }

    public function comments()
    {
        return $this->belongsTo(Comment::class);
    }
}
