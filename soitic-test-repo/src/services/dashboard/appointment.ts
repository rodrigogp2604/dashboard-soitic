import dados from '@/data/appointments.json';
import { Appointment } from '../../types/common/appointment';

export function getAppointments() {
    return dados as Appointment[];
}