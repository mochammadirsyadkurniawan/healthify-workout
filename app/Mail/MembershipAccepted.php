<?php
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><> klo udah online di https: ke server
// namespace App\Mail;

// use Illuminate\Bus\Queueable;
// use Illuminate\Mail\Mailable;
// use Illuminate\Queue\SerializesModels;

// class MembershipAccepted extends Mailable
// {
//     use Queueable, SerializesModels;

//     public $membership;

//     /**
//      * Create a new message instance.
//      */
//     public function __construct($membership)
//     {
//         $this->membership = $membership;
//     }

//     /**
//      * Build the message.
//      */
//     public function build()
//     {
//         return $this->subject('🎉 Selamat! Pendaftaran Membership Anda Diterima')
//             ->html('
//                 <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
//                     <div style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

//                         <div style="background-color: #0D5EAD; padding: 20px; text-align: center;">
//                             <img src="' . asset('assets/logo.png') . '" style="width: 100px; height: 100px; border-radius: 50%; background: white; padding: 5px; object-fit: cover;">
//                             <h2 style="margin: 10px 0 0 0; color: white;">Healthify Workout</h2>
//                         </div>

//                         <div style="padding: 30px;">
//                             <h3 style="color: #333;">Halo ' . $this->membership->name . ',</h3>
//                             <p>Selamat! Pengajuan membership Anda untuk paket <strong>' . $this->membership->membership . '</strong> telah <span style="color: green;"><strong>diterima</strong></span>.</p>

//                             <div style="margin: 20px 0; text-align: center;">
//                                 <img src="' . asset('storage/trainers/' . $this->membership->personalTrainer->image) . '" style="width: 150px; height: 150px; border-radius: 10px; object-fit: cover;">
//                                 <h4>' . $this->membership->personalTrainer->name . '</h4>
//                                 <p style="color: #666;">Specialty: ' . $this->membership->personalTrainer->specialty . '</p>
//                             </div>

//                             <p>Masa Aktif Membership: <strong>' . \Carbon\Carbon::parse($this->membership->start_date)->format('d M Y') . ' - ' . \Carbon\Carbon::parse($this->membership->end_date)->format('d M Y') . '</strong></p>

//                             <div style="margin: 30px 0; text-align: center;">
//                                 <a href="' . url('/dashboard') . '" style="background: #ff9000; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Buka Dashboard</a>
//                             </div>

//                             <p>Terima kasih telah bergabung bersama kami!</p>

//                             <p style="margin-top: 30px; font-size: 12px; color: #777;">Jika Anda merasa tidak mendaftar membership ini, mohon abaikan email ini.</p>
//                         </div>

//                         <div style="background-color: #0D5EAD; padding: 10px; text-align: center; color: white; font-size: 12px;">
//                             &copy; ' . date('Y') . ' Healthify Workout. All rights reserved.
//                         </div>

//                     </div>
//                 </div>
//             ');
//     }
// }


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class MembershipAccepted extends Mailable
{
    use Queueable, SerializesModels;

    public $membership;

    /**
     * Create a new message instance.
     */
    public function __construct($membership)
    {
        $this->membership = $membership;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        // Hitung masa aktif 1 bulan dari sekarang
        $startDate = Carbon::now();
        $endDate = $startDate->copy()->addMonth();

        // Data personal trainer
        $trainer = $this->membership->personalTrainer;
        $trainerName = $trainer ? $trainer->name : 'Tidak Ada';
        $trainerSpecialty = $trainer ? $trainer->specialty : 'Tidak Ada';
        $trainerImage = $trainer ? asset('storage/trainers/' . $trainer->image) : null;

        // $logoUrl = asset('assets/logo.png');

        return $this->subject('🎉 Selamat! Pendaftaran Membership Kamu Diterima')
            ->html('
                <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
                    <div style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <div style="background-color: #0D5EAD; padding: 20px; color: white; text-align: center;">
                    <h2 style="margin: 0;">Healthify Workout</h2>
                    </div>

                        <div style="padding: 30px;">
                            <h3 style="color: #333;">Halo ' . $this->membership->name . ',</h3>
                            <p>Selamat! Pengajuan membership Anda untuk paket <strong>' . $this->membership->membership . '</strong> telah <span style="color: green;"><strong>diterima</strong></span>.</p>
                            <p><strong>Masa Aktif Membership:</strong> ' . $startDate->format('d M Y') . ' - ' . $endDate->format('d M Y') . '</p>

                            <hr style="margin: 20px 0;">

                            <p><strong>Nama:</strong> ' . $trainerName . '</p>
                            <p><strong>Specialty:</strong> ' . $trainerSpecialty . '</p>

                            <div style="margin: 30px 0; text-align: center;">
                                <a href="' . url('/dashboard') . '" style="background: #ff9000; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Buka Dashboard</a>
                            </div>

                            <p>Terima kasih telah bergabung bersama kami!</p>
                            <p style="margin-top: 30px; font-size: 12px; color: #777;">Jika Anda merasa tidak mendaftar membership ini, mohon abaikan email ini.</p>
                        </div>
                        <div style="background-color: #0D5EAD; padding: 10px; text-align: center; color: white; font-size: 12px;">
                            &copy; ' . date('Y') . ' Healthify Workout. All rights reserved.
                        </div>
                    </div>
                </div>
            ');
    }
}



// update <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// namespace App\Mail;

// use Illuminate\Bus\Queueable;
// use Illuminate\Mail\Mailable;
// use Illuminate\Queue\SerializesModels;

// class MembershipAccepted extends Mailable
// {
//     use Queueable, SerializesModels;

//     public $membership;

//     /**
//      * Create a new message instance.
//      */
//     public function __construct($membership)
//     {
//         $this->membership = $membership;
//     }

//     /**
//      * Build the message.
//      */
//     public function build()
//     {
//         return $this->subject('🎉 Selamat! Pendaftaran Membership Anda Diterima')
//             ->html('
//                 <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
//                     <div style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
//                         <div style="background-color: #0D5EAD; padding: 20px; color: white; text-align: center;">
//                             <h2 style="margin: 0;">Healthify Workout</h2>
//                         </div>
//                         <div style="padding: 30px;">
//                             <h3 style="color: #333;">Halo ' . $this->membership->name . ',</h3>
//                             <p>Selamat! Pengajuan membership Anda untuk paket <strong>' . $this->membership->membership . '</strong> telah <span style="color: green;"><strong>diterima</strong></span>.</p>
//                             <p>Segera cek dashboard Anda untuk mendapatkan informasi lebih lanjut mengenai aktivitas dan benefit yang tersedia.</p>
//                             <div style="margin: 30px 0; text-align: center;">
//                                 <a href="' . url('/dashboard') . '" style="background: #ff9000; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Buka Dashboard</a>
//                             </div>
//                             <p>Terima kasih telah bergabung bersama kami!</p>
//                             <p style="margin-top: 30px; font-size: 12px; color: #777;">Jika Anda merasa tidak mendaftar membership ini, mohon abaikan email ini.</p>
//                         </div>
//                         <div style="background-color: #0D5EAD; padding: 10px; text-align: center; color: white; font-size: 12px;">
//                             &copy; ' . date('Y') . ' Healthify Workout. All rights reserved.
//                         </div>
//                     </div>
//                 </div>
//             ');
//     }
// }


// ============================================================================================== paling lama
// namespace App\Mail;

// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Mail\Mailable;
// use Illuminate\Mail\Mailables\Content;
// use Illuminate\Mail\Mailables\Envelope;
// use Illuminate\Queue\SerializesModels;
// use App\Models\ApplyMembership; // Model ApplyMembership kamu

// class MembershipAccepted extends Mailable
// {
//     use Queueable, SerializesModels;
//     // your code here:
//     public $membership;
//     public function __construct(ApplyMembership $membership)
//     {
//         $this->membership = $membership;
//     }

//     public function build()
//     {
//         return $this->subject('Membership Anda Telah Diterima!')
//             ->view('emails.membership-accepted');
//     }

//     /**
//      * Get the message envelope.
//      */
//     public function envelope(): Envelope
//     {
//         return new Envelope(
//             subject: 'Membership Accepted',
//         );
//     }

//     /**
//      * Get the message content definition.
//      */
//     public function content(): Content
//     {
//         return new Content(
//             view: 'view.name',
//         );
//     }

//     /**
//      * Get the attachments for the message.
//      *
//      * @return array<int, \Illuminate\Mail\Mailables\Attachment>
//      */
//     public function attachments(): array
//     {
//         return [];
//     }
// }


/**
 * Create a new message instance.
 */
    // public function __construct()
    // {
    //     //
    // }
