<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;

class Dashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-home';

    protected static string $view = 'filament.pages.dashboard';

    protected static ?string $title = '';

    protected ?string $heading = '';

    protected ?string $subheading = '';

    public function getTitle(): string
    {
        return app()->getLocale() === 'ar' ? 'لوحة التحكم' : 'Dashboard';
    }

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar' 
            ? 'مرحباً ' . (auth()->user()->name ?? 'المسؤول')
            : 'Welcome ' . (auth()->user()->name ?? 'Admin');
    }

    public function getSubheading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'نظرة عامة على إحصائيات تطبيق العقارات'
            : 'Property Application Overview & Statistics';
    }

    /**
     * @return array<class-string<Widget>|WidgetConfiguration>
     */
    public function getWidgets(): array
    {
        return [
            // Top Stats Row
            \App\Filament\Widgets\PropertyStatsWidget::class,
            \App\Filament\Widgets\InquiryStatsWidget::class,
            \App\Filament\Widgets\BrokerStatsWidget::class,
            \App\Filament\Widgets\UserEngagementWidget::class,

            // Charts & Analytics Section
            \App\Filament\Widgets\PropertyTrendChart::class,
            \App\Filament\Widgets\PropertiesByCategoryChart::class,

            // Additional Metrics
            \App\Filament\Widgets\PropertyStatusChart::class,
            \App\Filament\Widgets\PropertiesByLocationChart::class,

            // Activity & Recent Items
            \App\Filament\Widgets\RecentInquiriesWidget::class,
            \App\Filament\Widgets\TopBrokersWidget::class,
            \App\Filament\Widgets\RecentPropertiesWidget::class,
        ];
    }

    /**
     * @return int|string|array
     */
    protected function getVisibleWidgets(): int|string|array
    {
        return static::WIDGETS_FULL_WIDTH;
    }

    protected static bool $shouldRegisterNavigation = true;

    protected static ?int $navigationSort = -2;
}
