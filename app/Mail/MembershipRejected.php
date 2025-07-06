<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MembershipRejected extends Mailable
{
    use Queueable, SerializesModels;

    public $membership;

    public function __construct($membership)
    {
        $this->membership = $membership;
    }

    public function build()
    {
        return $this->subject('❌ Pendaftaran Membership Kamu Ditolak')
            ->html('
                <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
                    <div style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                        <div style="background-color: #0D5EAD; padding: 20px; color: white; text-align: center;">
                            <h2 style="margin: 0;">Healthify Workout</h2>
                        </div>

                        <div style="padding: 30px;">
                            <h3 style="color: #333;">Halo ' . $this->membership->name . ',</h3>
                            <p>Kami mohon maaf, pengajuan membership Anda untuk paket <strong>' . $this->membership->membership . '</strong> telah <span style="color: red;"><strong>ditolak</strong></span>.</p>
                            <p>Silakan hubungi tim kami untuk informasi lebih lanjut atau untuk mencoba mendaftar kembali.</p>

                            <div style="margin: 30px 0; text-align: center;">
                                <a href="https://wa.me/6287854592659" style="background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Hubungi Admin via WhatsApp</a>
                            </div>

                            <p>Kami tetap menyambut Anda untuk bergabung di kesempatan berikutnya!</p>

                            <p style="margin-top: 30px; font-size: 12px; color: #777;">Jika Anda merasa tidak mengajukan membership ini, mohon abaikan email ini.</p>
                        </div>
                        <div style="background-color: #0D5EAD; padding: 10px; text-align: center; color: white; font-size: 12px;">
                            &copy; ' . date('Y') . ' Healthify Workout. All rights reserved.
                        </div>
                    </div>
                </div>
            ');
    }
}


// default dari membership rejected
// namespace App\Mail;
// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Mail\Mailable;
// use Illuminate\Mail\Mailables\Content;
// use Illuminate\Mail\Mailables\Envelope;
// use Illuminate\Queue\SerializesModels;

// class MembershipRejected extends Mailable
// {
//     use Queueable, SerializesModels;

//     /**
//      * Create a new message instance.
//      */
//     public function __construct()
//     {
//         //
//     }

//     /**
//      * Get the message envelope.
//      */
//     public function envelope(): Envelope
//     {
//         return new Envelope(
//             subject: 'Membership Rejected',
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
