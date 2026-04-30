<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use Filament\Widgets\ChartWidget;

class PropertyStatusChart extends ChartWidget
{
    protected static ?string $heading = '';

    protected static ?string $maxHeight = '300px';

    protected static ?int $sort = 5;

    public function getHeading(): string
    {
        return app()->getLocale() === 'ar'
            ? 'حالة العقارات'
            : 'Property Status';
    }

    protected function getData(): array
    {
        $isArabic = app()->getLocale() === 'ar';

        $statusLabels = [
            'pending' => $isArabic ? 'قيد الانتظار' : 'Pending',
            'approved' => $isArabic ? 'موافق عليه' : 'Approved',
            'rejected' => $isArabic ? 'مرفوض' : 'Rejected',
            'in_negotiation' => $isArabic ? 'تحت التفاوض' : 'In Negotiation',
            'sold' => $isArabic ? 'مباع' : 'Sold',
            'rented' => $isArabic ? 'مؤجر' : 'Rented',
        ];

        $data = [];
        $labels = [];

        foreach ($statusLabels as $status => $label) {
            $count = Property::where('status', $status)->count();
            $data[] = $count;
            $labels[] = $label;
        }

        $colors = [
            'rgba(245, 158, 11, 0.8)', // pending - yellow
            'rgba(34, 197, 94, 0.8)',  // approved - green
            'rgba(239, 68, 68, 0.8)',  // rejected - red
            'rgba(168, 85, 247, 0.8)', // in_negotiation - purple
            'rgba(59, 130, 246, 0.8)', // sold - blue
            'rgba(14, 165, 233, 0.8)', // rented - cyan
        ];

        return [
            'datasets' => [
                [
                    'data' => $data,
                    'backgroundColor' => $colors,
                    'borderColor' => $colors,
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'pie';
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
