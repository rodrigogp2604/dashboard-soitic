import { filterOptions } from "@/lib/appointments/utils";
import { AppointmentFilterProps } from "@/types/dashboard/appointmentFilter";

export default function AppointmentFilter({ selected, onChange }: AppointmentFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => {
        const isActive = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-headline transition-all active:scale-95"
            style={{
              backgroundColor: isActive
                ? 'var(--color-primary-container)'
                : 'var(--color-surface-container)',
              color: isActive
                ? 'var(--color-on-primary)'
                : 'var(--color-outline)',
            }}
          >
            <span className="material-symbols-outlined text-[16px]">{option.icon}</span>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}