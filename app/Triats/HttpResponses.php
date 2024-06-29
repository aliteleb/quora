<?php

namespace App\Triats;

trait HttpResponses {
    protected function success ($data = [], $message = '', $status_code = 200)
    {
        return response()->json([
            'status' => 'Success response',
            'message' => $message,
            'data' => $data,
        ], $status_code);
    }

    protected function error($message = '', $errors = [], $status_code)
    {
        return response()->json([
            'status' => 'Error has occurred!',
            'message' => $message,
            'errors' => $errors,
        ], $status_code);
    }
}
