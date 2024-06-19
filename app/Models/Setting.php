<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Setting extends Model
{
    use HasFactory;

    protected $guarded = [];
    public static function boot(): void
    {
        parent::boot();

        static::updating(function ($setting) {
            $files = ['icon', 'background', 'logo'];
            $previous = $setting->getOriginal('value');
            if (in_array($setting->key, $files) && $setting->getDirty('value') && $previous) {
                if (Storage::disk('public')->exists($previous))
                    Storage::disk('public')->delete($previous);
            }
        });

        static::deleting(function ($setting) {
            $files = ['icon', 'background', 'logo'];
            if (in_array($setting->key, $files)) {
                $value = $setting->value;
                if ($value && Storage::disk('public')->exists($value))
                    Storage::disk('public')->delete($value);
            }
        });
    }
}
