'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className="sticky top-0 z-40 w-full backdrop-blur-md flex justify-between items-center h-20 px-6 lg:px-12 font-headline"
            style={{ backgroundColor: 'var(--color-surface)' }}
        >
            <div className="flex items-center gap-3 lg:gap-6 ml-auto">
                <button
                    onClick={toggleTheme}
                    className="p-2 transition-colors rounded-lg cursor-pointer"
                    style={{ color: 'var(--color-outline)' }}
                    title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                >
                    <span className="material-symbols-outlined">
                        {theme === 'light' ? 'dark_mode' : 'light_mode'}
                    </span>
                </button>

                <div className="w-px h-6 hidden sm:block" style={{ backgroundColor: 'var(--color-outline-variant)' }} />

                <div className="flex items-center gap-3 cursor-pointer">
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ backgroundColor: 'var(--color-primary-container)' }}
                    >
                        DR
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold leading-none" style={{ color: 'var(--color-on-surface)' }}>
                            Dr. Rodrigo
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-outline)' }}>
                            Administrador
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}