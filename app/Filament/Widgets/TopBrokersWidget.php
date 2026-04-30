<?php

namespace App\Filament\Widgets;

use App\Models\Broker;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class TopBrokersWidget extends BaseWidget
{
    protected static ?string $heading = '';

    protected static ?int $sort = 8;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'أفضل الوسطاء'
            : 'Top Brokers';
    }

    public function table(Table $table): Table
    {
        $isArabic = app()->getLocale() === 'ar';

        return $table
            ->query(
                Broker::withCount('properties')
                    ->orderBy('properties_count', 'desc')
                    ->limit(10)
            )
            ->columns([
                TextColumn::make('user.name')
                    ->label($isArabic ? 'الاسم' : 'Name')
                    ->searchable(),

                TextColumn::make('license_number')
                    ->label($isArabic ? 'رقم الترخيص' : 'License')
                    ->searchable(),

                TextColumn::make('specialization')
                    ->label($isArabic ? 'التخصص' : 'Specialization')
                    ->default($isArabic ? 'عام' : 'General'),

                TextColumn::make('commission_rate')
                    ->label($isArabic ? 'معدل العمولة' : 'Commission Rate')
                    ->formatStateUsing(fn($state) => number_format($state, 2) . '%'),

                TextColumn::make('properties_count')
                    ->label($isArabic ? 'عدد العقارات' : 'Properties')
                    ->counts('properties'),

                TextColumn::make('is_active')
                    ->label($isArabic ? 'النشاط' : 'Active')
                    ->formatStateUsing(fn($state) => $isArabic ? ($state ? 'نشط' : 'غير نشط') : ($state ? 'Active' : 'Inactive'))
                    ->badge()
                    ->color(fn(bool $state): string => $state ? 'success' : 'danger'),
            ])
            ->defaultSort('properties_count', 'desc')
            ->paginated(false);
    }
}
