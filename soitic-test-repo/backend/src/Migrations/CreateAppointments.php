<?php

namespace App\Migrations;

use Illuminate\Database\Capsule\Manager;

class CreateAppointments
{
    public function __construct(
        private Manager $capsule
    ) {}

    public function up()
    {
        $this->capsule::schema()->create('appointments', function ($table) {
            $table->id();
            $table->unsignedBigInteger('patient_id');
            $table->dateTime('appointment_date');
            $table->string('status');
            $table->string('type');
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
        });

        echo "Migração da tabela de agendamentos executada com sucesso.\n";
    }

    public function down()
    {
        $this->capsule::schema()->dropIfExists('appointments');
    }
}