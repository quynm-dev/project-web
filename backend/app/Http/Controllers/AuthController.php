<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $credentials = $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|confirmed|min:8'
        ]);

        $user = User::create([
            'name' => $credentials['name'],
            'username' => $credentials['username'],
            'password' => bcrypt($credentials['password']),
            'role' => 'user'
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('username', $credentials['username'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)) {
            return response([
                'message' => 'Login error'
            ], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}
