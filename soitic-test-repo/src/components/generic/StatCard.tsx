import { StatCardProps } from "@/types/common/statCard";

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div
      className="flex items-center gap-5 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(0,70,95,0.04)]"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + '20', color }}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p
          className="text-[11px] uppercase tracking-widest font-semibold font-label"
          style={{ color: 'var(--color-outline)' }}
        >
          {title}
        </p>
        <p
          className="text-3xl font-bold font-headline mt-0.5"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}