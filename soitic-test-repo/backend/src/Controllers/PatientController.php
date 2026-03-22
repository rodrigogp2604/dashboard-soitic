<?php

namespace App\Controllers;

use App\Models\Patient;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class PatientController
{
    public function index(Request $request, Response $response, array $args)
    {
        $patients = Patient::get();

        $response->getBody()->write(json_encode([
            'status' => true,
            'data' => $patients
        ]));

        return $response->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
}