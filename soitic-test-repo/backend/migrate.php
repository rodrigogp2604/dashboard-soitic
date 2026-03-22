<?php

require __DIR__ . '/vendor/autoload.php';

use App\Migrations\CreateAppointments;
use App\Migrations\CreatePatients;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

require __DIR__ . '/config/database.php';

echo "Iniciando a migração do banco de dados...\n";

$createAppointments = new CreateAppointments($capsule);
$createPatients = new CreatePatients($capsule);

/* ------- Exclui as tabelas da build anterior ------- */
$createAppointments->down();
$createPatients->down();

/* ------- Cria as tabelas novamente ------- */
$createPatients->up();
$createAppointments->up();

echo "Migração finalizada.\n";