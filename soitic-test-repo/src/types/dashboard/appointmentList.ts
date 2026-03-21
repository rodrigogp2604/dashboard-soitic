import { Appointment } from "../common/appointment";

export interface AppointmentListProps {
    appointments: Appointment[];
    isLoading?: boolean;
}