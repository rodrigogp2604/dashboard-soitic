'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className="relative w-full max-w-lg rounded-2xl shadow-[0px_12px_32px_rgba(0,70,95,0.12)] z-10 p-8"
                style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2
                        className="font-headline text-xl font-bold"
                        style={{ color: 'var(--color-on-surface)' }}
                    >
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer p-2 rounded-xl transition-colors"
                        style={{ color: 'var(--color-outline)' }}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
}