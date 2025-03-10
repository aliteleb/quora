<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Space extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $guarded = [];
    protected $with = ['media'];
    protected $withCount = ['posts', 'followers'];
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'space_topic');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follow_space', 'space_id', 'user_id');
    }

    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function posts()
    {
        return $this->hasMany(Thread::class)->where('type', 'post')->where('created_at' , '>', now()->lastWeekDay);
    }

    protected static function booted(): void
    {
        parent::booted();

        self::creating(function ($model) {
            $model->slug = Str::slug($model->name, '-', null);
        });

        self::updating(function ($model) {
            $model->slug = Str::slug($model->name, '-', null);
        });
    }
}
