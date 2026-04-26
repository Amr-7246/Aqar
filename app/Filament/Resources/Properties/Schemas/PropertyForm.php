<?php

namespace App\Filament\Resources\Properties\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PropertyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('broker_id')
                    ->required()
                    ->numeric(),
                TextInput::make('property_category_id')
                    ->required()
                    ->numeric(),
                TextInput::make('location_id')
                    ->required()
                    ->numeric(),
                Textarea::make('title')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('area_m2')
                    ->required()
                    ->numeric(),
                TextInput::make('type')
                    ->required(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('images')
                    ->required(),
                TextInput::make('videos')
                    ->required(),
            ]);
    }
}
