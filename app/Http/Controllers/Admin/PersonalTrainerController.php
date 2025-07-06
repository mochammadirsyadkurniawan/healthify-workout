<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PersonalTrainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PersonalTrainerController extends Controller
{
    public function index()
    {
        $trainers = PersonalTrainer::latest()->get();
        return Inertia::render('admin/PersonalTrainer', [
            'trainers' => $trainers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'membership_type' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('trainers', 'public');
        }

        PersonalTrainer::create($validated);

        return redirect()->route('admin.trainers.index')->with('success', 'Trainer created.');
    }

    public function edit($id)
    {
        $trainer = PersonalTrainer::findOrFail($id);
        return Inertia::render('admin/PersonalTrainerEdit', [
            'trainer' => $trainer,
        ]);
    }

    public function update(Request $request, $id)
    {
        $trainer = PersonalTrainer::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'membership_type' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($trainer->image && Storage::disk('public')->exists($trainer->image)) {
                Storage::disk('public')->delete($trainer->image);
            }
            $validated['image'] = $request->file('image')->store('trainers', 'public');
        }

        $trainer->update($validated);

        return redirect()->route('admin.trainers.index')->with('success', 'Trainer updated.');
    }

    public function destroy($id)
    {
        $trainer = PersonalTrainer::findOrFail($id);

        if ($trainer->image && Storage::disk('public')->exists($trainer->image)) {
            Storage::disk('public')->delete($trainer->image);
        }

        $trainer->delete();

        return redirect()->route('admin.trainers.index')->with('success', 'Trainer deleted.');
    }


    public function show($id)
    {
        $trainer = PersonalTrainer::findOrFail($id);
        return Inertia::render('admin/PersonalTrainerShow', [
            'trainer' => $trainer,
        ]);
    }

    public function fetchByMembership(Request $request)
    {
        $type = $request->query('membership_type');
        Log::info('Membership type received: ' . $type);

        $trainers = PersonalTrainer::where('membership_type', $type)
            ->withCount('memberships') // hitung jumlah applyMembership
            ->get()
            ->map(function ($trainer) {
                return [
                    'id' => $trainer->id,
                    'name' => $trainer->name,
                    'specialty' => $trainer->specialty,
                    'image' => $trainer->image,
                    'membership_type' => $trainer->membership_type,
                    'quota_used' => $trainer->memberships_count, // ini dikirim ke frontend
                ];
            });

        return response()->json($trainers);
    }
}


// public function fetchByMembership(Request $request)
    // {
    //     // Ambil semua personal trainer tanpa filter
    //     $trainers = PersonalTrainer::all();

    //     return response()->json($trainers);
    // }


    // public function fetchByMembership(Request $request)
    // {
    //     $type = $request->query('membership_type');
    //     Log::info('Membership type received: ' . $type);
    //     $trainers = PersonalTrainer::where('membership_type', $type)->get();

    //     return response()->json($trainers);
    // }


    // $trainers = PersonalTrainer::where('membership_type', $type)
        //     ->withCount('memberships') // hitung jumlah applyMembership
        //     ->get()
        //     ->map(function ($trainer) {
        //         return [
        //             'id' => $trainer->id,
        //             'name' => $trainer->name,
        //             'specialty' => $trainer->specialty,
        //             'image' => $trainer->image,
        //             'membership_type' => $trainer->membership_type,
        //             'quota_used' => $trainer->memberships_count, // ini dikirim ke frontend
        //         ];
        //     });
