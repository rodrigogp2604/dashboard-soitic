import { AppointmentStatus } from "./appointment";

export interface FilterOption {
  label: string;
  value: AppointmentStatus | 'todos';
  icon: string;
}