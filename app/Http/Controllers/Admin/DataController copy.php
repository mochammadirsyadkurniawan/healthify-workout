<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PersonalTrainer;
use App\Models\Notification;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DataController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $results = PersonalTrainer::where('name', 'like', "%{$query}%")
            ->orWhere('specialty', 'like', "%{$query}%")
            ->get();

        return response()->json($results);
    }

    public function notifications()
    {
        $notifications = Notification::latest()->limit(100)->get();

        $formatted = $notifications->map(function ($notif) {
            return [
                'id' => $notif->id,
                'message' => $notif->message,
                'time' => \Carbon\Carbon::parse($notif->time)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->translatedFormat('d F Y, H:i') . ' WIB',
                'time_diff' => \Carbon\Carbon::parse($notif->time)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->diffForHumans(),
            ];
        });

        return response()->json($formatted);
    }

    public function index()
    {
        $notifications = Notification::latest()->get();

        $formatted = $notifications->map(function ($notif) {
            return [
                'id' => $notif->id,
                'message' => $notif->message,
                'time' => \Carbon\Carbon::parse($notif->time)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->translatedFormat('d F Y, H:i') . ' WIB',
                'time_diff' => \Carbon\Carbon::parse($notif->time)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->diffForHumans(),
            ];
        });

        return Inertia::render('admin/AdminNotification', [
            'notifications' => $formatted,
        ]);
    }

    public function getNotifications()
    {
        $notifications = Notification::orderBy('created_at', 'desc')->limit(100)->get();

        $formatted = $notifications->map(function ($notif) {
            return [
                'id' => $notif->id,
                'message' => $notif->message,
                'time' => \Carbon\Carbon::parse($notif->time)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->translatedFormat('d F Y, H:i') . ' WIB',
                'time_diff' => \Carbon\Carbon::parse($notif->time)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->diffForHumans(),
                'is_read' => $notif->is_read
            ];
        });

        $unreadCount = Notification::where('is_read', false)->count();

        return response()->json([
            'notifications' => $formatted,
            'unreadCount' => $unreadCount,
        ]);
    }


    public function markNotificationsAsRead()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false]);
        }

        Notification::where('receiver_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

    public function getUserNotifications()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'notifications' => [],
                'unreadCount' => 0,
            ]);
        }

        $notifications = Notification::where('receiver_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(100)
            ->get();


        $formatted = $notifications->map(function (Notification $notif) {
            return [
                'id' => $notif->id,
                'message' => $notif->message,
                'time' => \Carbon\Carbon::parse($notif->created_at)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->translatedFormat('d F Y, H:i') . ' WIB',
                'time_diff' => \Carbon\Carbon::parse($notif->created_at)
                    ->locale('id')
                    ->timezone('Asia/Jakarta')
                    ->diffForHumans(),
                'is_read' => $notif->is_read,
            ];
        });

        // $formatted = $notifications->map(function (Notification $notif) {
        //     return [
        //         'id' => $notif->id,
        //         'message' => $notif->message,
        //         'time' => \Carbon\Carbon::parse($notif->time)
        //             ->locale('id')
        //             ->timezone('Asia/Jakarta')
        //             ->translatedFormat('d F Y, H:i') . ' WIB',
        //         'time_diff' => \Carbon\Carbon::parse($notif->time)
        //             ->locale('id')
        //             ->timezone('Asia/Jakarta')
        //             ->diffForHumans(),
        //         'is_read' => $notif->is_read,
        //     ];
        // });

        $unreadCount = Notification::where('receiver_id', $user->id)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'notifications' => $formatted,
            'unreadCount' => $unreadCount,
        ]);
    }


    // notification all

    
}
