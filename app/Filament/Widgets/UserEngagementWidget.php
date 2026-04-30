<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\PropertyView;
use App\Models\PropertyLike;
use App\Models\Favorite;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UserEngagementWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isArabic = app()->getLocale() === 'ar';

        $totalUsers = User::count();
        $activeUsers = User::where('status', 'active')->count();
        $totalViews = PropertyView::count();
        $totalLikes = PropertyLike::count();
        $totalFavorites = Favorite::count();

        return [
            Stat::make(
                $isArabic ? 'إجمالي المستخدمين' : 'Total Users',
                $totalUsers
            )
                ->description($isArabic ? 'المستخدمون المسجلون' : 'Registered users')
                ->descriptionIcon('heroicon-m-user')
                ->color('info')
                ->icon('heroicon-o-users'),

            Stat::make(
                $isArabic ? 'مستخدمون نشطون' : 'Active Users',
                $activeUsers
            )
                ->description($isArabic ? 'نشطون على المنصة' : 'Active on platform')
                ->descriptionIcon('heroicon-m-check')
                ->color('success')
                ->icon('heroicon-o-user-check'),

            Stat::make(
                $isArabic ? 'مشاهدات' : 'Total Views',
                $totalViews
            )
                ->description($isArabic ? 'مشاهدات العقارات' : 'Property views')
                ->descriptionIcon('heroicon-m-eye')
                ->color('cyan')
                ->icon('heroicon-o-eye'),

            Stat::make(
                $isArabic ? 'إعجابات' : 'Likes',
                $totalLikes
            )
                ->description($isArabic ? 'عدد الإعجابات' : 'Number of likes')
                ->descriptionIcon('heroicon-m-heart')
                ->color('rose')
                ->icon('heroicon-o-heart'),

            Stat::make(
                $isArabic ? 'المفضلة' : 'Favorites',
                $totalFavorites
            )
                ->description($isArabic ? 'العقارات المفضلة' : 'Favorite properties')
                ->descriptionIcon('heroicon-m-star')
                ->color('amber')
                ->icon('heroicon-o-star'),
        ];
    }
}
