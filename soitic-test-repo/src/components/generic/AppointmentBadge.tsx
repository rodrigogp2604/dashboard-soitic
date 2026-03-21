import { AppointmentBadgeProps } from '@/types/common/appointmentBadge';
import { statusConfig } from '@/lib/appointments/utils';

export default function AppointmentBadge({ status }: AppointmentBadgeProps) {
    const config = statusConfig[status];

    return (
        <>
            <span className="flex sm:hidden shrink-0" style={{ color: config.color }}>
                <span className="material-symbols-outlined text-[22px]">{config.icon}</span>
            </span>

            <span
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-label uppercase tracking-wide shrink-0"
                style={{ backgroundColor: config.bg, color: config.color }}
            >
                <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
                {config.label}
            </span>
        </>
    );
}