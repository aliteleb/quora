<?php

namespace App\Models;

// use Illuminate\Contracts\AuthBreeze\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'bio',
        'username',
        'password',
    ];

    protected $with = ['media'];
    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class);
    }
    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }
    public function questions(): HasMany
    {
        return $this->hasMany(Thread::class)->where('type', 'question');
    }
    public function posts(): HasMany
    {
        return $this->hasMany(Thread::class)->where('type', 'post');
    }
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    public function space(): BelongsToMany
    {
        return $this->belongsToMany(Space::class);
    }
    public function answers(): HasMany
    {
        return $this->hasMany(Comment::class)->where('type', 'answer');
    }
    public function followedSpaces(): BelongsToMany
    {
        return $this->belongsToMany(Space::class, 'follow_space', 'user_id', 'space_id');
    }

    public function followerUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follow_user', 'user_id', 'followed_id');
    }

    public function followedUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follow_user', 'followed_id', 'user_id');
    }

    public function blockedUser(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'block_user', 'user_id', 'blocked_id');
    }

    public function sharedThreads($user_id): Collection
    {
        return $this->hasMany(PostAction::class)->where('type', 'share')->where('user_id', $user_id)->pluck('thread_id');
    }

    public function getUnReadNotificationsCountAttribute(): int
    {
        return $this->hasMany(Notification::class)
            ->where('user_id', $this->id)
            ->where('is_read', false)
            ->count();
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
