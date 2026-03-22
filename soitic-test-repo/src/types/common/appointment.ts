export type Appointment = {
    id: number;
    patientName: string;
    appointmentDate: string;
    cpf: string;
    status: AppointmentStatus;
    type: AppointmentType;
}

export type AppointmentStatus = 'confirmado' | 'pendente' | 'cancelado';
export type AppointmentType = 'primeira consulta' | 'retorno' | 'exame';