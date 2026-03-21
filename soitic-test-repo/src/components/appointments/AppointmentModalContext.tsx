'use client';

import { AppointmentModalContextType } from '@/types/appointments/appointmentModal';
import { createContext, useContext, useState } from 'react';

const AppointmentModalContext = createContext<AppointmentModalContextType>({
    isOpen: false,
    open: () => {},
    close: () => {},
});

export function useAppointmentModal() {
    return useContext(AppointmentModalContext);
}

export function AppointmentModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AppointmentModalContext.Provider value={{
            isOpen,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }}>
            {children}
        </AppointmentModalContext.Provider>
    );
}