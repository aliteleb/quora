<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Space extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $guarded = [];

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
