<?php

namespace App\Filament\Widgets;

use App\Models\PropertyInquiry;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentInquiriesWidget extends BaseWidget
{
    protected static ?string $heading = '';

    protected static ?int $sort = 7;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'الاستفسارات الأخيرة'
            : 'Recent Inquiries';
    }

    public function table(Table $table): Table
    {
        $isArabic = app()->getLocale() === 'ar';

        return $table
            ->query(
                PropertyInquiry::with(['property', 'user'])
                    ->latest()
                    ->limit(10)
            )
            ->columns([
                TextColumn::make('id')
                    ->label($isArabic ? 'المعرف' : 'ID')
                    ->sortable(),

                TextColumn::make('property.title')
                    ->label($isArabic ? 'العقار' : 'Property')
                    ->limit(30)
                    ->searchable(),

                TextColumn::make('user.name')
                    ->label($isArabic ? 'المستخدم' : 'User')
                    ->searchable(),

                TextColumn::make('message')
                    ->label($isArabic ? 'الرسالة' : 'Message')
                    ->limit(40)
                    ->searchable(),

                TextColumn::make('status')
                    ->label($isArabic ? 'الحالة' : 'Status')
                    ->formatStateUsing(function ($state) use ($isArabic) {
                        $labels = [
                            'unread' => $isArabic ? 'لم تقرأ' : 'Unread',
                            'read' => $isArabic ? 'مقروءة' : 'Read',
                            'replied' => $isArabic ? 'تمت الإجابة' : 'Replied',
                        ];
                        return $labels[$state] ?? $state;
                    })
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'unread' => 'warning',
                        'read' => 'info',
                        'replied' => 'success',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label($isArabic ? 'التاريخ' : 'Date')
                    ->dateTime('M d, Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated(false);
    }
}
