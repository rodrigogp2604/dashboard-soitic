<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'appointments';

    protected $hidden = [
        'updatedAt'
    ];

    protected $fillable = [
        'patient_id',
        'appointment_date',
        'status',
        'type'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}