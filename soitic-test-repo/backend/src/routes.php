<?php

use App\Controllers\AppointmentController;
use App\Controllers\PatientController;

$app->get('/appointments', [AppointmentController::class, 'index']);
$app->post('/appointments', [AppointmentController::class, 'store']);

$app->get('/patients', [PatientController::class, 'index']);
$app->get('/patients/{id}', [PatientController::class, 'show']);