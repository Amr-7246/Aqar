<?php

namespace App\Filament\Widgets;

use App\Models\PropertyInquiry;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class InquiryStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isArabic = app()->getLocale() === 'ar';

        $totalInquiries = PropertyInquiry::count();
        $unreadInquiries = PropertyInquiry::where('status', 'unread')->count();
        $repliedInquiries = PropertyInquiry::where('status', 'replied')->count();

        return [
            Stat::make(
                $isArabic ? 'إجمالي الاستفسارات' : 'Total Inquiries',
                $totalInquiries
            )
                ->description($isArabic ? 'جميع استفسارات العملاء' : 'All customer inquiries')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('info')
                ->icon('heroicon-o-envelope'),

            Stat::make(
                $isArabic ? 'استفسارات لم تقرأ' : 'Unread Inquiries',
                $unreadInquiries
            )
                ->description($isArabic ? 'تحتاج إلى الاهتمام' : 'Require attention')
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('warning')
                ->icon('heroicon-o-bell'),

            Stat::make(
                $isArabic ? 'تمت الإجابة عليها' : 'Replied',
                $repliedInquiries
            )
                ->description($isArabic ? 'تم الرد عليها' : 'Responded to')
                ->descriptionIcon('heroicon-m-check')
                ->color('success')
                ->icon('heroicon-o-check-circle'),
        ];
    }
}
