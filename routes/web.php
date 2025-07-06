<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ApplyMembershipController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PersonalTrainerController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Admin\DataController;
use App\Http\Controllers\Admin\ManageUsersController;

// Halaman Utama
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Login & Register
Route::get('/login', function () {
    return Inertia::render('auth.login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth.register');
})->name('register');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/choose-membership-guest', function () {
    return Inertia::render('membership/ChooseMembershipGuest');
});

// Halaman Contact User (cek login)
Route::get('/user/contact', function () {
    return Inertia::render('user/Contact', [
        'isAuthenticated' => Auth::check()
    ]);
})->name('user.contact');

// Profile Routes (umum untuk user & admin)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/kebijakan-privasi', [UserController::class, 'privasi'])->name('privasi');


require __DIR__ . '/auth.php';

// ===============================
// USER ROUTES
// ===============================
Route::middleware(['auth', 'userMiddleware'])->group(function () {

    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::get('/privacy-policy', [UserController::class, 'privacy'])->name('privacy');
    // Route::get('/privacy-policy', [UserController::class, 'privasi'])->name('privasi');


    Route::get('/workout-categories', function () {
        return Inertia::render('WorkoutCategories');
    });

    Route::get('/choose-membership', function () {
        return Inertia::render('membership/ChooseMembership');
    });

    Route::get('/apply-membership', function () {
        return Inertia::render('membership/ApplyMembershipForm');
    });

    Route::get('/exercise/{id}', function ($id) {
        return Inertia::render('ExerciseDetail', ['id' => $id]);
    });

    // Route untuk user dan admin, tidak perlu dibatasi middleware khusus
    Route::post('/store-membership', [ApplyMembershipController::class, 'store'])->name('membership.store');

    // untuk menampilkan data personal trainer di choose membership
    Route::get('/trainers/by-membership', [App\Http\Controllers\Admin\PersonalTrainerController::class, 'fetchByMembership']);


    // notifikasi ke user
    Route::get('/user/notifications', [DataController::class, 'getUserNotifications']);

});


// ===============================
// ADMIN ROUTES
// ===============================
Route::middleware(['auth', 'adminMiddleware'])->group(function () {

    // Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    // routes/web.php
    Route::post('/admin/profile/upload-photo', [ProfileController::class, 'uploadPhoto'])->name('admin.profile.upload-photo');


    // Route::get('/admin/report', [AdminController::class, 'report'])->name('report');
    // Route::get('/admin/personal-trainer', [AdminController::class, 'personalTrainer'])->name('personal-trainer');

    Route::get('/admin/apply-membership', [ApplyMembershipController::class, 'index'])->name('apply-membership');

    Route::put('/admin/apply-membership/{id}/status', [ApplyMembershipController::class, 'updateStatus'])->name('admin.membership.status');
    Route::delete('/admin/apply-membership/{id}', [ApplyMembershipController::class, 'destroy']);

    // untuk fitur email
    // Route::post('/admin/apply-membership/{id}/accept', [ApplyMembershipController::class, 'accept'])->name('apply-membership.accept');


    // //  route untuk export PDF
    Route::get('/admin/reports', [ReportController::class, 'index'])->name('report');
    Route::get('/admin/reports/memberships/pdf', [ReportController::class, 'exportPDF'])->name('report.pdf');

    Route::get('/admin/reports/memberships/excel', [ReportController::class, 'exportExcel']);

    Route::get('/admin/reports/memberships/csv', [ReportController::class, 'exportCSV']);


    // Searchbar personal trainer
    Route::get('/admin/search', [DataController::class, 'search'])->name('admin.search');

    // Route::get('/admin/notifications', [DataController::class, 'notifications'])->name('admin.notifications');

    Route::get('/admin/notifications/all', [DataController::class, 'index'])->name('admin.notifications');

    Route::get('/admin/notifications/get-notification', [DataController::class, 'getNotifications']);
    Route::post('/admin/notifications/mark-read', [DataController::class, 'markNotificationsAsRead']);


    // CRUD Personal Trainer
    Route::get('/admin/personal-trainer', [PersonalTrainerController::class, 'index'])->name('admin.trainers.index');
    Route::post('/admin/personal-trainer', [PersonalTrainerController::class, 'store'])->name('admin.trainers.store');
    // Route::put('/admin/personal-trainer/{id}', [PersonalTrainerController::class, 'update'])->name('admin.trainers.update');

    Route::get('/admin/personal-trainer/{id}/edit', [PersonalTrainerController::class, 'edit'])->name('admin.trainers.edit');
    Route::put('/admin/personal-trainer/{id}', [PersonalTrainerController::class, 'update'])->name('admin.trainers.update');

    Route::get('/admin/personal-trainer/{id}', [PersonalTrainerController::class, 'show'])->name('admin.trainers.show');
    Route::delete('/admin/personal-trainer/{id}', [PersonalTrainerController::class, 'destroy'])->name('admin.trainers.destroy');


    // management users (CRUD)
    Route::get('/admin/users', [ManageUsersController::class, 'index'])->name('admin.users');
    Route::post('/admin/users', [ManageUsersController::class, 'store'])->name('admin.users.store');
    Route::get('/admin/users/{user}/edit', [ManageUsersController::class, 'edit'])->name('admin.users.edit');
    Route::put('/admin/users/{user}', [ManageUsersController::class, 'update'])->name('admin.users.update');
    Route::get('/admin/users/{user}', [ManageUsersController::class, 'show'])->name('admin.users.show');
    Route::delete('/admin/users/{user}', [ManageUsersController::class, 'destroy'])->name('admin.users.destroy');
});
