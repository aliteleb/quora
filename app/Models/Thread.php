<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;


class Thread extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $guarded = [];
    protected $with = ['share', 'media', 'user'];
    protected $withCount = ['votes_up', 'votes_down', 'comments'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function votes_up(): HasMany
    {
        return $this->hasMany(Vote::class)->where('vote_type', 'up');
    }

    public function votes_down(): HasMany
    {
        return $this->hasMany(Vote::class)->where('vote_type', 'down');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function space(): BelongsTo
    {
        return $this->belongsTo(Space::class);
    }

    public function share(): BelongsTo
    {
        return $this->belongsTo(Thread::class, 'share_to');
    }
    public function shares(): HasMany
    {
        return $this->hasMany(Thread::class, 'share_to');
    }

    public function shared(): HasMany
    {
        return $this->hasMany(Thread::class, 'share_to')->where('user_id', auth()->id());
    }

    public static function boot()
    {
        parent::boot();

        static::created(function ($thread) {
            if (empty($thread->slug)) {
                if ($thread->title) {
                    $words = explode(' ', $thread->title);
                    $firstWord = $words[0] ?? 'slug';
                    $secondWord = $words[1] ?? $thread->id;
                    $thread->slug = Str::slug($firstWord . '_' . $secondWord . $thread->id);
                } else {
                    $thread->slug = 'slug_' . $thread->id;
                }
                $thread->save();
            }
        });
    }
}
