<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;
    // public $timestamps = false;
    public $timestamps = true;
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
        'time',
        'is_read',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}




// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

// class Notification extends Model
// {
//     use HasFactory;

//     protected $table = 'notifications'; // Opsional, jika nama tabel sesuai konvensi Laravel

//     protected $fillable = [
//         'user_id',
//         'message',
//         'time',
//         'is_read',
//     ];

//     public $timestamps = false; // Nonaktifkan jika tabel tidak punya created_at / updated_at


//     public function admin()
//     {
//         return $this->belongsTo(User::class);
//     }

//     public function user()
//     {
//         return $this->belongsTo(User::class);
//     }
// }
