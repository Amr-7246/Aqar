<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class PropertyTrendChart extends ChartWidget
{
    protected static ?string $heading = '';

    protected static ?string $maxHeight = '300px';

    protected static ?int $sort = 3;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar' 
            ? 'اتجاه تسجيل العقارات'
            : 'Property Registration Trend';
    }

    protected function getData(): array
    {
        $isArabic = app()->getLocale() === 'ar';
        
        $last30Days = collect(range(29, 0))->map(function ($i) {
            return now()->subDays($i);
        });

        $data = $last30Days->map(function ($date) {
            return Property::whereDate('created_at', $date)->count();
        });

        $labels = $last30Days->map(fn($date) => $date->format('M d'))->toArray();

        return [
            'datasets' => [
                [
                    'label' => $isArabic ? 'عقارات جديدة' : 'New Properties',
                    'data' => $data->toArray(),
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
                    'pointRadius' => 0,
                    'pointHoverRadius' => 6,
                    'pointBackgroundColor' => '#3b82f6',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'position' => app()->getLocale() === 'ar' ? 'top' : 'top',
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'max' => null,
                ],
            ],
        ];
    }
}
