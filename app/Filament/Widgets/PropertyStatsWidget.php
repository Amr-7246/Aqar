<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PropertyStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isArabic = app()->getLocale() === 'ar';

        $totalProperties = Property::count();
        $activeProperties = Property::where('is_active', true)->count();
        $pendingApproval = Property::where('status', 'pending')->count();
        $soldProperties = Property::where('status', 'sold')->count();

        return [
            Stat::make(
                $isArabic ? 'إجمالي العقارات' : 'Total Properties',
                $totalProperties
            )
                ->description($isArabic ? 'جميع العقارات المسجلة' : 'All registered properties')
                ->descriptionIcon('heroicon-m-building-library')
                ->color('blue')
                ->icon('heroicon-o-home'),

            Stat::make(
                $isArabic ? 'عقارات نشطة' : 'Active Properties',
                $activeProperties
            )
                ->description($isArabic ? 'العقارات المنشورة حالياً' : 'Currently listed properties')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('green')
                ->icon('heroicon-o-check-badge'),

            Stat::make(
                $isArabic ? 'في انتظار الموافقة' : 'Pending Approval',
                $pendingApproval
            )
                ->description($isArabic ? 'تنتظر مراجعة الإدارة' : 'Awaiting admin review')
                ->descriptionIcon('heroicon-m-clock')
                ->color('yellow')
                ->icon('heroicon-o-hourglass'),

            Stat::make(
                $isArabic ? 'عقارات مباعة' : 'Sold Properties',
                $soldProperties
            )
                ->description($isArabic ? 'تم بيعها بنجاح' : 'Successfully sold')
                ->descriptionIcon('heroicon-m-check')
                ->color('success')
                ->icon('heroicon-o-banknotes'),
        ];
    }
}
