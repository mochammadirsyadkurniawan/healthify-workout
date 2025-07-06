<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalTrainer extends Model
{
    use HasFactory;

    // Menentukan kolom yang boleh diisi (fillable)
    protected $fillable = [
        'name',
        'specialty',
        'image',
        'membership_type',
    ];


    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function applyMemberships()
    {
        return $this->hasMany(ApplyMembership::class, 'personal_trainer_id');
    }

    // relasi untuk kuota membership
    public function memberships()
    {
        return $this->hasMany(ApplyMembership::class, 'personal_trainer_id');
        // return $this->hasMany(ApplyMembership::class, 'personal_trainer_id')
        //     ->where('status', 'accepted');
    }


    // public function acceptedMemberships()
    // {
    //     return $this->hasMany(ApplyMembership::class, 'personal_trainer_id')
    //         ->where('status', 'accepted');
    // }


}
