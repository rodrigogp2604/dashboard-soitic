export interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface AppointmentModalContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}