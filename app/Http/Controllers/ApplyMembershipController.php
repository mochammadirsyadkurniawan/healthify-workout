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
use App\Mail\MembershipRejected;
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

    // ✅ Ambil hanya satu admin pertama untuk menerima notifikasi
    $admin = User::where('usertype', 'admin')->first();

    if ($admin) {
        Notification::create([
            'sender_id' => auth()->id(), // User yang apply
            'receiver_id' => $admin->id, // Admin yang menerima notifikasi
            'message' => '📝 ' . $user->name . ' telah mengajukan pendaftaran untuk paket ' . $request->membership . ' di Healthify Workout.',
            'time' => now(),
            'is_read' => false,
        ]);
    }

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
             $user = User::find($membership->user_id); // Tambahkan ini di awal

            $membership->update([
                'status' => 'Rejected',
                'personal_trainer_id' => null,
            ]);

            // Mail::to($membership->user->email)->send(new MembershipAccepted($membership));
            Mail::to($membership->user->email)->send(new MembershipRejected($membership));

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


