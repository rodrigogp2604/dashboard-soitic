<?php

namespace App\Migrations;

use Illuminate\Database\Capsule\Manager;

class CreatePatients
{
    public function __construct(
        private Manager $capsule
    ) {}

    public function up()
    {
        $this->capsule::schema()->create('patients', function ($table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('cpf')->unique();
            $table->date('birth_date');
            $table->string('city');
            $table->string('uf', 2);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        echo "Migração da tabela de pacientes executada com sucesso.\n";
    }

    public function down()
    {
        $this->capsule::schema()->dropIfExists('patients');
    }
}