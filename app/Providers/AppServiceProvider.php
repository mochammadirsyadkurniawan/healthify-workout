<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;


// use Inertia\Inertia;

// Inertia::share([
//     'auth.user' => fn() => auth()->user(),
//     'notifications' => fn() => \App\Models\Notification::latest()->take(10)->get()
// ]);

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }


}
