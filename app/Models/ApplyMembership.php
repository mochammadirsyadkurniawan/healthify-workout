<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class ApplyMembership extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'membership',
        'bukti_transfer',
        'status',
        'transfer_proof',
        'personal_trainer_id' // ⬅️ Tambahkan ini
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // public function user(): BelongsTo
    // {
    //     return $this->belongsTo(User::class);
    // }
    public function personalTrainer(): BelongsTo
    {
        return $this->belongsTo(PersonalTrainer::class, 'personal_trainer_id');
    }
}



    // public function personalTrainer()
    // {
    //     return $this->belongsTo(PersonalTrainer::class, 'personal_trainer_id');
    // }

    // relasi untuk kuota membership
