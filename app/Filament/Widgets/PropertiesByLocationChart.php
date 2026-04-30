<?php

namespace App\Filament\Widgets;

use App\Models\Location;
use App\Models\Property;
use Filament\Widgets\ChartWidget;

class PropertiesByLocationChart extends ChartWidget
{
    protected static ?string $heading = '';

    protected static ?string $maxHeight = '300px';

    protected static ?int $sort = 6;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'العقارات حسب الموقع'
            : 'Properties by Location';
    }

    protected function getData(): array
    {
        $locations = Location::withCount('properties')
            ->get()
            ->sortByDesc('properties_count')
            ->take(8);

        $labels = $locations->pluck('name')->toArray();
        $data = $locations->pluck('properties_count')->toArray();

        $colors = [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(234, 88, 12, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(107, 114, 128, 0.8)',
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
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
            ],
            'scales' => [
                'x' => [
                    'beginAtZero' => true,
                    'max' => null,
                ],
            ],
        ];
    }
}
