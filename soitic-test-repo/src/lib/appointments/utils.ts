import { Appointment, AppointmentStatus } from "@/types/common/appointment";
import { FilterOption } from "@/types/common/filter";

export function filterByStatus(appointments: Appointment[], status: AppointmentStatus): Appointment[] {
    return appointments.filter(appointment => appointment.status === status);
}

export function sortByDateDesc(appointments: Appointment[]): Appointment[] {
    return [...appointments].sort((a, b) =>
        new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
    );
}

export function getTotalByStatus(appointments: Appointment[], status: AppointmentStatus): number {
    return filterByStatus(appointments, status).length;
}

export function getLast6MonthsData(appointments: Appointment[]) {
    const counts: Record<string, number> = {};

    appointments.forEach((a) => {
        const date = new Date(a.appointmentDate);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6)
        .map(([key, total]) => {
            const [year, month] = key.split('-');
            const label = new Date(parseInt(year), parseInt(month) - 1, 1)
                .toLocaleDateString('pt-BR', { month: 'short' })
                .replace('.', '')
                .replace(/^\w/, (c) => c.toUpperCase());
            return { mes: label, agendamentos: total };
        });
}

export function paginateAppointments(appointments: Appointment[], page: number, perPage: number | 'todos') {
    if (perPage === 'todos') return appointments;
    const start = (page - 1) * perPage;
    return appointments.slice(start, start + perPage);
}

export const statusConfig = {
    confirmado: {
        label: 'Confirmado',
        icon: 'check_circle',
        bg: 'rgba(46, 125, 50, 0.12)',
        color: '#2e7d32',
    },
    pendente: {
        label: 'Pendente',
        icon: 'schedule',
        bg: 'var(--color-tertiary-fixed)',
        color: 'var(--color-tertiary)',
    },
    cancelado: {
        label: 'Cancelado',
        icon: 'cancel',
        bg: 'var(--color-error-container)',
        color: 'var(--color-error)',
    },
}

export const typeLabels = {
    'primeira consulta': 'Primeira Consulta',
    'retorno': 'Retorno',
    'exame': 'Exame',
}

export const typeOptions = [
    { label: typeLabels['primeira consulta'], value: 'primeira consulta' },
    { label: typeLabels['retorno'], value: 'retorno' },
    { label: typeLabels['exame'], value: 'exame' },
];

export const filterOptions: FilterOption[] = [
    { label: 'Todos', value: 'todos', icon: 'filter_list' },
    { label: 'Confirmados', value: 'confirmado', icon: 'check_circle' },
    { label: 'Pendentes', value: 'pendente', icon: 'schedule' },
    { label: 'Cancelados', value: 'cancelado', icon: 'cancel' },
];

export const statusOptions = filterOptions.filter(o => o.value !== 'todos') as { label: string; value: AppointmentStatus; icon: string }[];