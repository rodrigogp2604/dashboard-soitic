'use client';

import { useState, useRef, useEffect } from 'react';
import { SelectProps } from "@/types/generics";

export default function Select({ label, value, onChange, options, placeholder }: SelectProps) {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selected = options.find(o => String(o.value) === String(value));
    const filtered = options.filter(o =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleOpen() {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownStyle({
                position: 'fixed',
                top: rect.bottom + 4,
                left: rect.left,
                width: rect.width,
                zIndex: 9999,
            });
        }
        setOpen(o => !o);
    }

    function handleSelect(val: string) {
        onChange(val);
        setOpen(false);
        setSearch('');
    }

    return (
        <div className="flex flex-col gap-1.5" ref={ref}>
            <label
                className="text-[11px] uppercase tracking-widest font-semibold font-label"
                style={{ color: 'var(--color-outline)' }}
            >
                {label}
            </label>

            <button
                ref={buttonRef}
                type="button"
                onClick={handleOpen}
                className="w-full rounded-xl py-3 px-4 text-sm text-left flex items-center justify-between transition-all"
                style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    color: selected ? 'var(--color-on-surface)' : 'var(--color-outline)',
                }}
            >
                <span className="truncate">{selected ? selected.label : placeholder ?? 'Selecione...'}</span>
                <span className="material-symbols-outlined text-[18px] shrink-0 ml-2" style={{ color: 'var(--color-outline)' }}>
                    {open ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {open && (
                <div
                    className="rounded-xl shadow-[0px_8px_24px_rgba(0,70,95,0.12)] overflow-hidden"
                    style={{
                        ...dropdownStyle,
                        backgroundColor: 'var(--color-surface-container-lowest)',
                    }}
                >
                    <div className="p-2 border-b" style={{ borderColor: 'var(--color-outline-variant)' }}>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px]" style={{ color: 'var(--color-outline)' }}>
                                search
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full rounded-lg py-2 pl-9 pr-3 text-sm outline-none"
                                style={{
                                    backgroundColor: 'var(--color-surface-container)',
                                    color: 'var(--color-on-surface)',
                                }}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-48">
                        {filtered.length === 0 ? (
                            <p className="py-4 text-center text-sm" style={{ color: 'var(--color-outline)' }}>
                                Nenhum resultado
                            </p>
                        ) : (
                            filtered.map(o => (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => handleSelect(String(o.value))}
                                    className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:opacity-80"
                                    style={{
                                        backgroundColor: String(o.value) === String(value)
                                            ? 'var(--color-surface-container)'
                                            : 'transparent',
                                        color: 'var(--color-on-surface)',
                                    }}
                                >
                                    {o.label}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}