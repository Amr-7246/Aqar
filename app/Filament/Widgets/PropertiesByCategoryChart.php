<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use App\Models\PropertyCategory;
use Filament\Widgets\ChartWidget;

class PropertiesByCategoryChart extends ChartWidget
{
    protected static ?string $heading = '';

    protected static ?string $maxHeight = '300px';

    protected static ?int $sort = 4;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'العقارات حسب الفئة'
            : 'Properties by Category';
    }

    protected function getData(): array
    {
        $categories = PropertyCategory::withCount('properties')
            ->get()
            ->sortByDesc('properties_count')
            ->take(6);

        $labels = $categories->pluck('name')->toArray();
        $data = $categories->pluck('properties_count')->toArray();

        $colors = [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(234, 88, 12, 0.8)',
            'rgba(14, 165, 233, 0.8)',
        ];

        return [
            'datasets' => [
                [
                    'data' => $data,
                    'backgroundColor' => array_slice($colors, 0, count($data)),
                    'borderColor' => array_slice($colors, 0, count($data)),
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'position' => app()->getLocale() === 'ar' ? 'bottom' : 'bottom',
                ],
            ],
        ];
    }
}
