import { getTotalByStatus } from '@/lib/appointments/utils';
import StatCard from '@/components/generic/StatCard';
import { StatsCardsProps } from '@/types/dashboard/StatsCardsProps';

export default function StatsCards({ appointments }: StatsCardsProps) {
    const stats = [
        {
            title: 'Total',
            value: appointments.length,
            icon: 'calendar_month',
            color: 'var(--color-primary-container)',
        },
        {
            title: 'Confirmados',
            value: getTotalByStatus(appointments, 'confirmado'),
            icon: 'check_circle',
            color: '#2e7d32',
        },
        {
            title: 'Pendentes',
            value: getTotalByStatus(appointments, 'pendente'),
            icon: 'schedule',
            color: 'var(--color-tertiary-container)',
        },
        {
            title: 'Cancelados',
            value: getTotalByStatus(appointments, 'cancelado'),
            icon: 'cancel',
            color: 'var(--color-error)',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </div>
    );
}