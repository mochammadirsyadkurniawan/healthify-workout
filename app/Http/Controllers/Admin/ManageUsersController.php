<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ManageUsersController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('admin/ManageUsers', [
            'users' => $users,
        ]);
    }

    // Menyimpan data user baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'usertype' => ['required', 'in:admin,user'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'usertype' => $request->usertype,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.users')->with('success', 'User created successfully.');
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        // Pastikan path profile_photo sesuai dengan folder 'profile-photos'
        if ($user->profile_photo && !str_starts_with($user->profile_photo, 'http')) {
            $user->profile_photo = asset('storage/profile-photos/' . basename($user->profile_photo));
        }

        return Inertia::render('admin/ShowUser', [
            // 'user' => $user,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'usertype' => $user->usertype,
                'status' => $user->status,
                'profile_photo' => $user->profile_photo,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
        ]);
    }


    public function edit($id)
    {
        $user = User::findOrFail($id);

        // Pastikan path profile_photo sesuai dengan folder 'profile-photos'
        if ($user->profile_photo && !str_starts_with($user->profile_photo, 'http')) {
            $user->profile_photo = asset('storage/profile-photos/' . basename($user->profile_photo));
        }

        return Inertia::render('admin/EditUser', [
            'user' => $user,
        ]);
    }

    // public function update(Request $request, $id)
    // {
    //     $user = User::findOrFail($id);

    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|max:255',
    //         'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    //     ]);

    //     $user->name = $request->name;
    //     $user->email = $request->email;

    //     if ($request->hasFile('profile_photo')) {
    //         // Hapus foto lama jika ada
    //         if ($user->profile_photo && Storage::disk('public')->exists('profile-photos/' . basename($user->profile_photo))) {
    //             Storage::disk('public')->delete('profile-photos/' . basename($user->profile_photo));
    //         }

    //         // Simpan foto baru ke folder 'profile-photos'
    //         $path = $request->file('profile_photo')->store('profile-photos', 'public');
    //         $user->profile_photo = $path;
    //     }

    //     $user->save();

    //     return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    // }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Validation rules
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'usertype' => 'required|in:admin,user',  // Added usertype validation
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];

        // Only validate password if it's provided
        if ($request->filled('password')) {
            $rules['password'] = 'required|string|min:6|confirmed';
        }

        $request->validate($rules);

        // Update user data
        $user->name = $request->name;
        $user->email = $request->email;
        $user->usertype = $request->usertype;  // Update usertype

        // Update password if provided
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // Handle profile photo
        if ($request->hasFile('profile_photo')) {
            // Hapus foto lama jika ada
            if ($user->profile_photo && Storage::disk('public')->exists('profile-photos/' . basename($user->profile_photo))) {
                Storage::disk('public')->delete('profile-photos/' . basename($user->profile_photo));
            }

            // Simpan foto baru ke folder 'profile-photos'
            $path = $request->file('profile_photo')->store('profile-photos', 'public');
            $user->profile_photo = $path;
        }

        $user->save();

        return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Hapus foto profil jika ada
        if ($user->profile_photo && Storage::disk('public')->exists('profile-photos/' . basename($user->profile_photo))) {
            Storage::disk('public')->delete('profile-photos/' . basename($user->profile_photo));
        }

        $user->delete();

        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }
}


// namespace App\Http\Controllers\Admin;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\User;
// use Illuminate\Support\Facades\Hash;
// use Inertia\Inertia;

// class ManageUsersController extends Controller
// {
//     // Menampilkan semua users
//     public function index()
//     {
//         $users = User::orderBy('name')->get();

//         return Inertia::render('admin/ManageUsers', [
//             'users' => $users,
//         ]);
//     }

//     // Menampilkan halaman tambah user
//     public function create()
//     {
//         return Inertia::render('admin/CreateUser');
//     }

//     // Menyimpan data user baru
//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => ['required', 'string', 'max:255'],
//             'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
//             'usertype' => ['required', 'in:admin,user'],
//             'password' => ['required', 'string', 'min:6', 'confirmed'],
//         ]);

//         User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'usertype' => $request->usertype,
//             'password' => Hash::make($request->password),
//         ]);

//         return redirect()->route('admin.users')->with('success', 'User created successfully.');
//     }

//     // Menampilkan detail 1 user
//     public function show(User $user)
//     {
//         return Inertia::render('admin/ShowUser', [
//             'user' => $user,
//         ]);
//     }

//     // Menampilkan halaman edit user
//     public function edit(User $user)
//     {
//         return Inertia::render('admin/EditUser', [
//             'user' => $user,
//         ]);
//     }

//     // Update data user
//     public function update(Request $request, User $user)
//     {
//         $request->validate([
//             'name' => ['required', 'string', 'max:255'],
//             'email' => ['required', 'email', 'max:255'],
//             'usertype' => ['required', 'in:admin,user'],
//         ]);

//         $user->update($request->only('name', 'email', 'role'));

//         return redirect()->route('admin.users')->with('success', 'User updated successfully.');
//     }

//     // Hapus user
//     public function destroy(User $user)
//     {
//         $user->delete();

//         return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
//     }
// }
