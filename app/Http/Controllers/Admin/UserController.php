<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(): Response
    {
        return Inertia::render('admin/users/index', [
            'users' => User::query()
                ->select(['id', 'name', 'email', 'is_admin', 'email_verified_at', 'created_at'])
                ->latest()
                ->paginate(15)
                ->through(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                    'email_verified_at' => $user->email_verified_at?->toISOString(),
                    'created_at' => $user->created_at?->format('d/m/Y'),
                ]),
        ]);
    }

    /**
     * Show the form for creating a user.
     */
    public function create(): Response
    {
        return Inertia::render('admin/users/create');
    }

    /**
     * Store a newly created user.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        User::create([
            ...$request->safe()->except('password'),
            'password' => Hash::make($request->validated('password')),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Usuario creado.')]);

        return to_route('admin.users.index');
    }

    /**
     * Show the form for editing a user.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('admin/users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ],
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();

        if (filled($validated['password'] ?? null)) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Usuario actualizado.')]);

        return to_route('admin.users.index');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()?->is($user)) {
            return back()->withErrors([
                'user' => __('No puedes eliminar tu propio usuario desde este módulo.'),
            ]);
        }

        $user->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Usuario eliminado.')]);

        return to_route('admin.users.index');
    }
}
