<?php

namespace App\Services;

class AppointmentServices
{
    public function mapAppointments(array $appointments): array
    {
        return array_map(fn($a) => $this->mapAppointment((object) $a), $appointments);
    }

    public function mapAppointment(object $appointment): array
    {
        $patient = (object) $appointment->patient;

        return [
            'id'              => $appointment->id,
            'patientName'     => $patient->name . ' ' . $patient->surname,
            'cpf'             => $patient->cpf,
            'appointmentDate' => $appointment->appointment_date,
            'status'          => $appointment->status,
            'type'            => $appointment->type,
        ];
    }
}