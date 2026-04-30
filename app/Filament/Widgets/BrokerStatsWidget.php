<?php

namespace App\Filament\Widgets;

use App\Models\Broker;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BrokerStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isArabic = app()->getLocale() === 'ar';

        $totalBrokers = Broker::count();
        $activeBrokers = Broker::where('is_active', true)->count();

        return [
            Stat::make(
                $isArabic ? 'إجمالي الوسطاء' : 'Total Brokers',
                $totalBrokers
            )
                ->description($isArabic ? 'الوسطاء المسجلون' : 'Registered brokers')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('purple')
                ->icon('heroicon-o-user-group'),

            Stat::make(
                $isArabic ? 'وسطاء نشطون' : 'Active Brokers',
                $activeBrokers
            )
                ->description($isArabic ? 'جاهزون للعمل' : 'Ready to work')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->icon('heroicon-o-user-check'),
        ];
    }
}
