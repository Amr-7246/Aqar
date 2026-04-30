<?php
namespace App\Traits;

use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

trait ResponseWrapper {
  public function emit(
      array $data = [],
      string $component = '',
      bool $success = true,
      string $message = '',
      $error = null,
      int $status = 200
    ) {
    $isApi = request()->expectsJson();
    $res = $this->uniRes($success, $message, $error, $data);
    if (!$success) {
        Log::error("Response Error Logged:", ['error' => $error, 'path' => request()->path()]);
    }
    return $isApi 
        ? response()->json($res, $status) 
        : Inertia::render($component, $res);
  }
  private function uniRes($success, $message, $error=null, $data = null){
    if(!$success){
      Log::error("this error coming from the clientResolver global function", ['error' => $error]);
    }
    return [
      'success' => $success,
      'message' => $message,
      'error' => $error,
      'data' => $data
    ];
  }
}