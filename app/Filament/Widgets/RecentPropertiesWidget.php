<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentPropertiesWidget extends BaseWidget
{
    protected static ?string $heading = '';

    protected static ?int $sort = 9;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'العقارات الأخيرة'
            : 'Recent Properties';
    }

    public function table(Table $table): Table
    {
        $isArabic = app()->getLocale() === 'ar';

        return $table
            ->query(Property::with(['owner', 'broker', 'location'])->latest()->limit(10))
            ->columns([
                TextColumn::make('title')
                    ->label($isArabic ? 'العنوان' : 'Title')
                    ->limit(30)
                    ->searchable(),

                TextColumn::make('location.name')
                    ->label($isArabic ? 'الموقع' : 'Location')
                    ->searchable(),

                TextColumn::make('price')
                    ->label($isArabic ? 'السعر' : 'Price')
                    ->formatStateUsing(fn($state) => number_format($state, 2)),

                TextColumn::make('area_m2')
                    ->label($isArabic ? 'المساحة (م²)' : 'Area (m²)'),

                TextColumn::make('purpose')
                    ->label($isArabic ? 'الغرض' : 'Purpose')
                    ->formatStateUsing(fn($state) => $isArabic 
                        ? ($state === 'rent' ? 'إيجار' : 'بيع')
                        : ($state === 'rent' ? 'Rent' : 'Sale')
                    )
                    ->badge()
                    ->color(fn(string $state): string => $state === 'rent' ? 'info' : 'warning'),

                TextColumn::make('status')
                    ->label($isArabic ? 'الحالة' : 'Status')
                    ->formatStateUsing(function ($state) use ($isArabic) {
                        $labels = [
                            'pending' => $isArabic ? 'قيد الانتظار' : 'Pending',
                            'approved' => $isArabic ? 'موافق عليه' : 'Approved',
                            'rejected' => $isArabic ? 'مرفوض' : 'Rejected',
                            'in_negotiation' => $isArabic ? 'تحت التفاوض' : 'In Negotiation',
                            'sold' => $isArabic ? 'مباع' : 'Sold',
                            'rented' => $isArabic ? 'مؤجر' : 'Rented',
                        ];
                        return $labels[$state] ?? $state;
                    })
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        'in_negotiation' => 'info',
                        'sold' => 'success',
                        'rented' => 'info',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label($isArabic ? 'التاريخ' : 'Date')
                    ->dateTime('M d, Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated(false);
    }
}
