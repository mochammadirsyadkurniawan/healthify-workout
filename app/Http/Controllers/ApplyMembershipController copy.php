<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplyMembership;
use App\Models\PersonalTrainer;
use App\Models\Notification;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

// email ke user
use App\Mail\MembershipAccepted;
use Illuminate\Support\Facades\Mail;

class ApplyMembershipController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'bukti_transfer' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'personal_trainer_id' => 'nullable|exists:personal_trainers,id',
        ]);

        if ($request->personal_trainer_id) {
            $trainer = PersonalTrainer::withCount([
                'applyMemberships as accepted_members' => function ($query) {
                    $query->where('status', 'accepted');
                }
            ])->find($request->personal_trainer_id);

            if ($trainer && $trainer->max_clients !== null && $trainer->accepted_members >= $trainer->max_clients) {
                return back()->withErrors([
                    'personal_trainer_id' => 'Kuota trainer ini sudah penuh. Silakan pilih trainer lain.',
                ]);
            }
        }

        $path = $request->file('bukti_transfer')->store('bukti_transfer', 'public');
        $user = Auth::user();

        ApplyMembership::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'membership' => $request->membership,
            'bukti_transfer' => $path,
            'status' => 'pending',
            'personal_trainer_id' => $request->personal_trainer_id,
        ]);

        $admins = User::where('usertype', 'admin')->get();

        foreach ($admins as $admin) {
            Notification::create([
                'sender_id' => auth()->id(), // User yang apply
                // 'sender_id' => $admin->id(), // User yang apply
                'receiver_id' => $admin->id, // Admin yang menerima notifikasi
                'message' => '📝 ' . $user->name . ' telah mengajukan pendaftaran untuk paket ' . $request->membership . ' di Healthify Workout.',
                'time' => now(),
                'is_read' => false,
            ]);
        }

        // $admin = User::where('usertype', 'admin')->first();
        // Notification::create([
        //     'sender_id' => auth()->id(), // user yg apply
        //     'receiver_id' => $admin->id,  // admin
        //     'message' => '📝 ' . $user->name . ' telah mengajukan pendaftaran untuk paket ' . $request->membership . ' di Healthify Workout.',
        //     //     'time' => now(),
        //     // 'message' => auth()->user()->name . ' telah mengajukan apply membership.',
        //     'time' => now(),
        //     'is_read' => false,
        // ]);


        // Notification::create([
        //     'message' => '📝 ' . $user->name . ' telah mengajukan pendaftaran untuk paket ' . $request->membership . ' di Healthify Workout.',
        //     'time' => now(),
        //     'is_read' => false,
        // ]);

        return back()->with('success', 'Pendaftaran membership berhasil. Menunggu konfirmasi admin.');
    }

    public function index()
    {
        $memberships = ApplyMembership::with(['user', 'personalTrainer'])->latest()->get();
        $personalTrainers = PersonalTrainer::all();

        return Inertia::render('admin/ApplyMembership', [
            'memberships' => $memberships,
            'personalTrainers' => $personalTrainers,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $membership = ApplyMembership::findOrFail($id);
        $personalTrainer = PersonalTrainer::find($membership->personal_trainer_id);
        $user = User::find($membership->user_id); // Tambahkan ini di awal

        if ($request->status === 'Accepted') {
            if (
                $personalTrainer &&
                $personalTrainer->max_clients !== null &&
                $personalTrainer->applyMemberships()->where('status', 'accepted')->count() >= $personalTrainer->max_clients
            ) {
                return back()->withErrors(['status' => 'Kuota trainer sudah penuh.']);
            }

            $membership->update(['status' => 'Accepted']);

            // 🔥 Kirim email setelah status diubah Accepted
            Mail::to($membership->user->email)->send(new MembershipAccepted($membership));

            // 🔥 Kirim NOTIFIKASI KE USER (Bukan ke Admin)
            Notification::create([
                'sender_id' => auth()->id(), // Admin yang acc
                // 'sender_id' => $user->id(), // Admin yang acc
                'receiver_id' => $user->id,   // User yang apply
                'message' => '🎉 Pendaftaran membership kamu (' . $membership->membership . ') telah diterima! Selamat bergabung di Healthify Workout.',
                'time' => now(),
                'is_read' => false,
            ]);
            // Notification::create([
            //     'sender_id' => auth()->id(), // Admin yang acc
            //     // 'sender_id' => $user->id(), // Admin yang acc
            //     'receiver_id' => $user->id,   // User yang apply
            //     'message' => '🎉 Pendaftaran membership kamu (' . $membership->membership . ') telah diterima! Selamat bergabung di Healthify Workout.',
            //     'is_read' => false,
            // ]);
        }

        if ($request->status === 'Rejected') {
            if ($personalTrainer) {
                $personalTrainer->increment('max_clients');
            }

            $membership->update([
                'status' => 'Rejected',
                'personal_trainer_id' => null,
            ]);

            // 🔥 Kirim NOTIFIKASI KE USER
            Notification::create([
                'sender_id' => auth()->id(), // Admin
                // 'sender_id' => $user->id(), // Admin
                'receiver_id' => $user->id,   // User
                'message' => '❌ Maaf, pendaftaran membership kamu (' . $membership->membership . ') ditolak. Silakan hubungi admin untuk info lebih lanjut.',
                'time' => now(),
                'is_read' => false,
            ]);
            // Notification::create([
            //     'sender_id' => auth()->id(), // Admin
            //     // 'sender_id' => $user->id(), // Admin
            //     'receiver_id' => $user->id,   // User
            //     'message' => '❌ Maaf, pendaftaran membership kamu (' . $membership->membership . ') ditolak. Silakan hubungi admin untuk info lebih lanjut.',
            //     'is_read' => false,
            // ]);
        }

        return redirect()->back()->with('success', 'Status berhasil diperbarui.');
    }


    // public function updateStatus(Request $request, $id)
    // {
    //     $membership = ApplyMembership::findOrFail($id);
    //     $personalTrainer = PersonalTrainer::find($membership->personal_trainer_id);

    //     if ($request->status === 'Accepted') {
    //         if (
    //             $personalTrainer &&
    //             $personalTrainer->max_clients !== null &&
    //             $personalTrainer->applyMemberships()->where('status', 'accepted')->count() >= $personalTrainer->max_clients
    //         ) {
    //             return back()->withErrors(['status' => 'Kuota trainer sudah penuh.']);
    //         }

    //         $membership->update(['status' => 'Accepted']);

    //         // 🔥 Kirim email setelah status diubah Accepted
    //         Mail::to($membership->user->email)->send(new MembershipAccepted($membership));

    //         $user = User::find($membership->user_id);

    //         if ($request->status === 'Accepted') {
    //             Notification::create([
    //                 'sender_id' => auth()->id(), // Admin
    //                 'receiver_id' => $user->id,  // User
    //                 'message' => '🎉 Pendaftaran membership kamu (' . $membership->membership . ') telah diterima! Selamat bergabung di Healthify Workout.',
    //                 'time' => now(),
    //                 'is_read' => false,
    //             ]);
    //         }

    //         if ($request->status === 'Rejected') {
    //             Notification::create([
    //                 'sender_id' => auth()->id(), // Admin
    //                 'receiver_id' => $user->id,  // User
    //                 'message' => '❌ Maaf, pendaftaran membership kamu (' . $membership->membership . ') ditolak. Silakan hubungi admin untuk info lebih lanjut.',
    //                 'time' => now(),
    //                 'is_read' => false,
    //             ]);
    //         }
    //         // $user = User::find($membership->user_id);
    //         // Notification::create([
    //         //     'sender_id' => auth()->id(), // admin yg acc
    //         //     'receiver_id' => $user->id,   // user
    //         //     // 'message' => 'Membership kamu telah diterima! Selamat!',
    //         //     'message' => '🎉 Pendaftaran membership kamu (' . $membership->membership . ') telah diterima! Selamat bergabung di Healthify Workout.',
    //         //     'time' => now(),
    //         //     'is_read' => false,
    //         // ]);

    //         // 🔥 Tambahkan Notifikasi ke User
    //         // Notification::create([
    //         //     'user_id' => $membership->user_id,
    //         //     'message' => '🎉 Pendaftaran membership kamu (' . $membership->membership . ') telah diterima! Selamat bergabung di Healthify Workout.',
    //         //     'time' => now(),
    //         //     'is_read' => false,
    //         // ]);
    //     }

    //     if ($request->status === 'Rejected') {
    //         if ($personalTrainer) {
    //             $personalTrainer->increment('max_clients');
    //         }
    //         $membership->update([
    //             'status' => 'Rejected',
    //             'personal_trainer_id' => null,
    //         ]);
    //     }

    //     return redirect()->back()->with('success', 'Status berhasil diperbarui.');
    // }


    public function destroy($id)
    {
        $membership = ApplyMembership::findOrFail($id);
        $membership->delete();

        return redirect()->back()->with('success', 'Data apply membership berhasil dihapus.');
    }

    public function create()
    {
        $personalTrainers = PersonalTrainer::withCount([
            'applyMemberships as accepted_members' => function ($query) {
                $query->where('status', 'accepted');
            }
        ])->get();

        return Inertia::render('membership/ApplyMembershipForm', [
            'personalTrainers' => $personalTrainers,
        ]);
    }
}



// public function updateStatus(Request $request, $id)
    // {
    //     $membership = ApplyMembership::findOrFail($id);
    //     $personalTrainer = PersonalTrainer::find($membership->personal_trainer_id);

    //     if ($request->status === 'Accepted') {
    //         if (
    //             $personalTrainer &&
    //             $personalTrainer->max_clients !== null &&
    //             $personalTrainer->applyMemberships()->where('status', 'accepted')->count() >= $personalTrainer->max_clients
    //         ) {
    //             return back()->withErrors(['status' => 'Kuota trainer sudah penuh.']);
    //         }
    //         $membership->update(['status' => 'Accepted']);
    //     }

    //     if ($request->status === 'Rejected') {
    //         if ($personalTrainer) {
    //             // Kembalikan kuota (anggap sebelumnya sudah diambil saat apply)
    //             $personalTrainer->increment('max_clients');
    //         }

    //         // Reset data trainer di apply membership
    //         $membership->update([
    //             'status' => 'Rejected',
    //             'personal_trainer_id' => null, // ini penting agar nanti di frontend muncul 'N/A'
    //         ]);
    //     }

    //     return redirect()->back()->with('success', 'Status berhasil diperbarui.');
    // }

// Di method approve atau accept
    // public function accept($id)
    // {
    //     $membership = ApplyMembership::findOrFail($id);
    //     $membership->status = 'accepted';
    //     $membership->save();

    //     // Kirim Email
    //     Mail::to($membership->user->email)->send(new MembershipAccepted($membership));

    //     return redirect()->back()->with('success', 'Membership accepted and email sent!');
    // }


// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\ApplyMembership;
// use App\Models\PersonalTrainer;
// use App\Models\Notification;
// use Inertia\Inertia;
// use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Facades\Auth;


// class ApplyMembershipController extends Controller
// {
//     public function store(Request $request)
//     {
//         $request->validate([
//             'bukti_transfer' => 'required|image|mimes:jpeg,png,jpg|max:2048',
//             'personal_trainer_id' => 'nullable|exists:personal_trainers,id',
//             'membership' => 'required|string'
//         ]);

//         if ($request->personal_trainer_id) {
//             $trainer = PersonalTrainer::withCount([
//                 'applyMemberships as accepted_members' => function ($query) {
//                     $query->where('status', 'Accepted');
//                 }
//             ])->find($request->personal_trainer_id);

//             if ($trainer && $trainer->max_clients !== null && $trainer->accepted_members >= $trainer->max_clients) {
//                 return back()->withErrors([
//                     'personal_trainer_id' => 'Kuota trainer ini sudah penuh. Silakan pilih trainer lain.',
//                 ]);
//             }
//         }

//         $path = $request->file('bukti_transfer')->store('bukti_transfer', 'public');
//         $user = Auth::user();

//         ApplyMembership::create([
//             'user_id' => $user->id,
//             'name' => $user->name,
//             'email' => $user->email,
//             'membership' => $request->membership,
//             'bukti_transfer' => $path,
//             'status' => 'Pending',
//             'personal_trainer_id' => $request->personal_trainer_id,
//         ]);

//         Notification::create([
//             'message' => '📝 ' . $user->name . ' telah mengajukan pendaftaran untuk paket ' . $request->membership . ' di Healthify Workout.',
//             'time' => now(),
//             'is_read' => false,
//         ]);

//         return back()->with('success', 'Pendaftaran membership berhasil. Menunggu konfirmasi admin.');
//     }

//     public function index()
//     {
//         $memberships = ApplyMembership::with(['user', 'personalTrainer'])->latest()->get();
//         $personalTrainers = PersonalTrainer::all();

//         return Inertia::render('admin/ApplyMembership', [
//             'memberships' => $memberships,
//             'personalTrainers' => $personalTrainers,
//         ]);
//     }

//     // public function update(Request $request, $id)
//     // {
//     //     $membership = ApplyMembership::findOrFail($id);
//     //     $oldStatus = $membership->status;
//     //     $newStatus = $request->input('status');

//     //     $membership->status = $newStatus;
//     //     $membership->save();

//     //     // Cek jika status sebelumnya adalah 'Pending' dan sekarang jadi 'Rejected'
//     //     if (
//     //         ($oldStatus) === 'Pending' &&
//     //         ($newStatus) === 'Rejected' &&
//     //         $request->filled('personal_trainer_id')
//     //     ) {
//     //         $trainer = PersonalTrainer::find($request->input('personal_trainer_id'));
//     //         if ($trainer) {
//     //             $trainer->kuota += 1;
//     //             $trainer->save();
//     //         }
//     //     }

//     //     return response()->json([
//     //         'message' => 'Membership updated successfully',
//     //     ]);
//     // }

//     // public function update(Request $request, $id)
//     // {
//     //     $membership = ApplyMembership::findOrFail($id);
//     //     $oldStatus = $membership->status;

//     //     $membership->status = $request->input('status');
//     //     $membership->save();

//     //     // Jika status berubah dari pending ke rejected dan ada personal trainer
//     //     if ($oldStatus === 'Pending' && $membership->status === 'Rejected' && $membership->personal_trainer_id) {
//     //         $trainer = PersonalTrainer::find($membership->personal_trainer_id);
//     //         if ($trainer) {
//     //             $trainer->kuota += 1; // Kembalikan kuota
//     //             $trainer->save();
//     //         }
//     //     }

//     //     return redirect()->back()->with('success', 'Membership application updated successfully.');
//     // }

//     public function update(Request $request, $id)
//     {
//         try {
//             $application = ApplyMembership::findOrFail($id);

//             $oldStatus = $application->status;
//             $newStatus = $request->input('status');

//             $application->status = $newStatus;
//             $application->save();

//             // Kembalikan kuota jika status berubah ke "Rejected"
//             if ($newStatus === 'Rejected' && $oldStatus !== 'Rejected') {
//                 $trainer = $application->personalTrainer;
//                 if ($trainer) {
//                     $trainer->kuota += 1;
//                     $trainer->save();
//                 }
//             }

//             return response()->json(['message' => 'Status updated successfully']);
//         } catch (\Exception $e) {
//             return response()->json(['error' => 'Something went wrong!'], 500);
//         }
//     }

//     public function destroy($id)
//     {
//         $membership = ApplyMembership::findOrFail($id);
//         $membership->delete();

//         return redirect()->back()->with('success', 'Data apply membership berhasil dihapus.');
//     }

//     public function create()
//     {
//         $personalTrainers = PersonalTrainer::withCount([
//             'applyMemberships as accepted_members' => function ($query) {
//                 $query->where('status', 'Accepted');
//             }
//         ])->get();

//         return Inertia::render('membership/ApplyMembershipForm', [
//             'personalTrainers' => $personalTrainers,
//         ]);
//     }
// }




  // public function updateStatus(Request $request, $id)
    // {
    //     $request->validate([
    //         'status' => 'required|in:Pending,Accepted,Rejected',
    //     ]);

    //     $membership = ApplyMembership::findOrFail($id);
    //     $personalTrainer = PersonalTrainer::find($membership->personal_trainer_id);

    //     if ($request->status === 'Accepted') {
    //         if ($personalTrainer && $personalTrainer->max_clients !== null && $personalTrainer->applyMemberships()->where('status', 'Accepted')->count() >= $personalTrainer->max_clients) {
    //             return back()->withErrors(['status' => 'Kuota trainer sudah penuh.']);
    //         }
    //     }

    //     $membership->update(['status' => $request->status]);

    //     return redirect()->back()->with('success', 'Status berhasil diperbarui.');
    // }
