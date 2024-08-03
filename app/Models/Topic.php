<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Topic extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $guarded = [];

    public function users ()
    {
        return $this->hasMany(User::class);
    }
    public function spaces()
    {
        return $this->belongsToMany(Space::class, 'space_topic');
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
