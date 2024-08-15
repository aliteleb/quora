<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class Comment extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $with = ['user', 'mention'];
    protected $guarded = [];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function mention(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mention_id')->select(['id', 'name']);
    }

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class)->with(['replies', 'user']);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'comment_id', 'id');
    }

}
