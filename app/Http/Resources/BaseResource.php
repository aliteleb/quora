<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Get the array from the child resource
        $array = $this->resourceToArray($request);

        // Filter out null or empty values
        return array_filter($array, function ($value) {
            return !is_null($value) && $value !== '';
        });
    }

    protected function resourceToArray(Request $request): array
    {
        // This method should be implemented by child classes
        return [];
    }
}
