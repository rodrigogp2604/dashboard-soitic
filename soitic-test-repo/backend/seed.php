<?php

require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use App\Models\Patient;
use App\Models\Appointment;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

require __DIR__ . '/config/database.php';

echo "Iniciando seed...\n";

$patientsJson = file_get_contents('/var/www/data/patients.json');
$appointmentsJson = file_get_contents('/var/www/data/appointments.json');

$patients = json_decode($patientsJson, true);
$appointments = json_decode($appointmentsJson, true);

foreach ($patients as $p) {
    Patient::create([
        'name'       => $p['name'],
        'surname'    => $p['surname'],
        'cpf'        => $p['cpf'],
        'birth_date' => $p['birth_date'],
        'city'       => $p['city'],
        'uf'         => $p['uf'],
        'active'     => $p['active'],
    ]);
}

echo "Pacientes inseridos com sucesso!\n";

foreach ($appointments as $a) {
    Appointment::create([
        'patient_id'       => $a['patient_id'],
        'appointment_date' => $a['appointmentDate'],
        'status'           => $a['status'],
        'type'             => $a['type'],
    ]);
}

echo "Agendamentos inseridos com sucesso!\n";
echo "Seed finalizado.\n";