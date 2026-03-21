<?php

namespace App\Controllers;

use App\Models\Patient;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class PatientController
{
    public function index(Request $request, Response $response, array $args)
    {
        $patients = Patient::where('active', true)->get();

        $response->getBody()->write(json_encode([
            'status' => true,
            'data' => $patients
        ]));

        return $response->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    public function show(Request $request, Response $response, array $args)
    {
        $patient = Patient::find($args['id']);

        if (!$patient) {
            $response->getBody()->write(json_encode([
                'status' => false,
                'message' => 'Paciente não encontrado'
            ]));

            return $response->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        }

        $response->getBody()->write(json_encode([
            'status' => true,
            'data' => $patient
        ]));

        return $response->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
}