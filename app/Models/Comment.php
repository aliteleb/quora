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
    protected $with = ['user'];
    protected $guarded = [];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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
    public function getMention()
    {
        return $this->parent?->user;
    }

    protected static function boot()
    {
        parent::boot();

        self::deleting(function ($model) {
            // Check if the model is a top-level comment (no parent comment)
            if (is_null($model->comment_id)) {
                // Recursively delete all nested replies
                self::deleteReplies($model);
            }
        });
    }

    protected static function deleteReplies($model)
    {
        foreach ($model->replies as $reply) {
            // Recursively delete replies of the reply
            self::deleteReplies($reply);
            // Delete the reply itself
            $reply->delete();
        }
    }

}
