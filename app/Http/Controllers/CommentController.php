<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $propertyId)
    {
      //& validate data and the prop
        $validated = $request->validate([
          "body" => 'required|string|max:5000'
        ]);
        $property = \App\Models\Property::findOrFail($propertyId);
      //& create the comment and attach it to the property
        $comment = new \App\Models\Comment();
        $comment->body = $validated['body'];
        $comment->user_id = Auth::id();
        $comment->property_id = $property->id;
        $comment->save();
      
      return back()->with('success', 'تم إضافة التعليق بنجاح');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
