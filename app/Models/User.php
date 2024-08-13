<?php

namespace App\Models;

// use Illuminate\Contracts\AuthBreeze\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
    ];


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
    public function followedSpaces()
    {
        return $this->belongsToMany(Space::class, 'follow_space', 'user_id', 'space_id');
    }

    public function followerUser()
    {
        return $this->belongsToMany(User::class, 'follow_user', 'user_id', 'followed_id');
    }

    public function followedUser()
    {
        return $this->belongsToMany(User::class, 'follow_user', 'followed_id', 'user_id');
    }

    public function blockedUser()
    {
        return $this->belongsToMany(User::class, 'block_user', 'user_id', 'blocked_id');
    }

//    public function isFollowedSpace()
//    {
//        return $this->belongsToMany(Space::class, 'follow_space', 'user_id', 'space_id')
//            ->where('user_id', auth()->id());
//    }

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
