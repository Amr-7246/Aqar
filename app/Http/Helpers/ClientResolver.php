<?php

namespace App\Http\Helpers;

use Inertia\Inertia;

//! can i make that function auto inherted into all controller
class ClientResolver {
  public function resolve(
      ?string $clientType = null, 
      array $data = [],
      //& inertia response
      string $component = '',  
      
      //& SPA or mobile json response
      string $isSuccess = '',
      string $message = '',
      string $debugMessage = '',
      int $status = 200,
    ) {

    switch ($clientType) {
      case 'API':
        return response()->json([
          'success' => $isSuccess,
          'message' => $message,
          'debug_message' => $debugMessage,
          'data' => $data
        ], $status);
        break;
      
      default:
        return Inertia::render($component, $data) ;
        break;
    }
  }
}