<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\PersonalTrainer;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard');
    }

    public function applyMembership()
    {
        return Inertia::render('admin/ApplyMembership');
    }

    public function report()
    {
        return Inertia::render('admin/Report');
    }

    public function personalTrainer() {
        return Inertia::render('admin/PersonalTrainer');
    }

    public function dashboard()
    {
        $notifications = Notification::latest()->take(10)->get();

        return Inertia::render('admin/Dashboard', [
            'notifications' => $notifications
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $results = PersonalTrainer::where('name', 'like', "%{$query}%")
            ->orWhere('specialty', 'like', "%{$query}%")
            ->get();

        return response()->json($results);
    }

    public function notifications()
    {
        $notifications = Notification::latest()->get();
        return Inertia::render('admin/Notifications', [
            'notifications' => $notifications,
        ]);
    }
}



// return view('dashboard');
