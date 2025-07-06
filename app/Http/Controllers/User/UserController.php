<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        return Inertia::render('Dashboard');
    }


    public function privacy() {
        return Inertia::render('PrivacyPolicy');
    }

    public function privasi() {
        return Inertia::render('KebijakanPrivasi');
    }
}










// return view('dashboard');
