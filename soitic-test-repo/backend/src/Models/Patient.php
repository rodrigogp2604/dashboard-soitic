<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table = 'patients';

    protected $fillable = [
        'name',
        'surname',
        'cpf',
        'birth_date',
        'city',
        'uf',
        'active'
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}