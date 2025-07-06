<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ApplyMembership;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $statusCounts = ApplyMembership::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->get();

        $categoryCounts = ApplyMembership::selectRaw('membership, COUNT(*) as total')
            ->groupBy('membership')
            ->get();

        return Inertia::render('admin/Dashboard', [
            'auth' => ['user' => Auth::user()],
            'statusChart' => $statusCounts,
            'categoryChart' => $categoryCounts,
        ]);
    }
}



// namespace App\Http\Controllers\Admin;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

// class DashboardController extends Controller
// {
//     //
// }
