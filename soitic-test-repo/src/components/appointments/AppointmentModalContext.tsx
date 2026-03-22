'use client';

import { createContext, useContext, useState } from 'react';

interface AppointmentModalContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    lastCreated: number;
    notifyCreated: () => void;
}

const AppointmentModalContext = createContext<AppointmentModalContextType>({
    isOpen: false,
    open: () => {},
    close: () => {},
    lastCreated: 0,
    notifyCreated: () => {},
});

export function useAppointmentModal() {
    return useContext(AppointmentModalContext);
}

export function AppointmentModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [lastCreated, setLastCreated] = useState(0);

    return (
        <AppointmentModalContext.Provider value={{
            isOpen,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
            lastCreated,
            notifyCreated: () => setLastCreated(Date.now()),
        }}>
            {children}
        </AppointmentModalContext.Provider>
    );
}