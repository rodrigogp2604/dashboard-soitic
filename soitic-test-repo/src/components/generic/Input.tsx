import { InputProps } from "@/types/generics";

export default function Input({ label, type = 'text', value, onChange, placeholder }: InputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest font-semibold font-label" style={{ color: 'var(--color-outline)' }}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl py-3 px-4 text-sm outline-none transition-all"
                style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    color: 'var(--color-on-surface)',
                    colorScheme: 'inherit',
                }}
            />
        </div>
    );
}