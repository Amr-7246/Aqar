@php
    $isArabic = app()->getLocale() === 'ar';
@endphp

<x-filament-panels::page>
    <div class="space-y-6">
        <!-- Dashboard Header -->
        <div class="rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg">
            <h1 class="text-3xl font-bold mb-2">
                {{ $isArabic ? 'لوحة التحكم' : 'Dashboard' }}
            </h1>
            <p class="text-blue-100 text-lg">
                {{ $isArabic 
                    ? 'مرحباً ' . (auth()->user()->name ?? 'المسؤول') . ' - نظرة عامة على تطبيق العقارات'
                    : 'Welcome ' . (auth()->user()->name ?? 'Admin') . ' - Property Application Overview' 
                }}
            </p>
        </div>

        <!-- Stats Section -->
        <div class="grid gap-4">
            @livewire(\App\Filament\Widgets\PropertyStatsWidget::class)
        </div>

        <div class="grid gap-4">
            @livewire(\App\Filament\Widgets\InquiryStatsWidget::class)
        </div>

        <div class="grid gap-4">
            @livewire(\App\Filament\Widgets\BrokerStatsWidget::class)
        </div>

        <div class="grid gap-4">
            @livewire(\App\Filament\Widgets\UserEngagementWidget::class)
        </div>

        <!-- Charts Section -->
        <div class="grid gap-6 lg:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow">
                @livewire(\App\Filament\Widgets\PropertyTrendChart::class)
            </div>
            <div class="rounded-lg bg-white p-6 shadow">
                @livewire(\App\Filament\Widgets\PropertiesByCategoryChart::class)
            </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow">
                @livewire(\App\Filament\Widgets\PropertyStatusChart::class)
            </div>
            <div class="rounded-lg bg-white p-6 shadow">
                @livewire(\App\Filament\Widgets\PropertiesByLocationChart::class)
            </div>
        </div>

        <!-- Recent Activities Section -->
        <div class="space-y-6">
            <div class="rounded-lg bg-white p-6 shadow">
                @livewire(\App\Filament\Widgets\RecentInquiriesWidget::class)
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
                <div class="rounded-lg bg-white p-6 shadow">
                    @livewire(\App\Filament\Widgets\TopBrokersWidget::class)
                </div>
                <div class="rounded-lg bg-white p-6 shadow">
                    @livewire(\App\Filament\Widgets\RecentPropertiesWidget::class)
                </div>
            </div>
        </div>
    </div>
</x-filament-panels::page>
