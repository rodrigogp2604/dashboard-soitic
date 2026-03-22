<?php

namespace App\Controllers;

use App\Models\Appointment;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class AppointmentController
{
    public function index(Request $request, Response $response, array $args)
    {
        $appointments = Appointment::with('patient')
            ->orderBy('appointment_date', 'desc')
            ->get();

        $response->getBody()->write(json_encode([
            'status' => true,
            'data' => $appointments
        ]));

        return $response->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function store(Request $request, Response $response, array $args)
    {
        $body = $request->getParsedBody();

        $appointments = Appointment::create([
            'patient_id' => $body['patient_id'],
            'appointment_date' => $body['appointment_date'],
            'status' => $body['status'],
            'type' => $body['type']
        ]);

        $response->getBody()->write(json_encode([
            'status' => true,
            'data' => $appointments
        ]));

        return $response->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }
}