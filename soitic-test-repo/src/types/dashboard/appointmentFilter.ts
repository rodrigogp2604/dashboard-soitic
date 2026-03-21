import { AppointmentStatus } from "../common/appointment";

export interface AppointmentFilterProps {
  selected: AppointmentStatus | 'todos';
  onChange: (status: AppointmentStatus | 'todos') => void;
}