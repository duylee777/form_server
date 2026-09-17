<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    // Chuyển hướng tới nhà cung cấp (google, facebook, github...)
    public function redirectToProvider(string $provider)
    {
        if ($provider === 'google') {
            return Socialite::driver('google')
            ->scopes([
                'https://www.googleapis.com/auth/forms.body.readonly',
                'https://www.googleapis.com/auth/drive.metadata.readonly', // Bắt buộc để đọc danh sách Form
            ])
            ->with(['access_type' => 'offline', 'prompt' => 'consent']) // Bắt buộc để lấy Refresh Token
            ->redirect();
        }
        else {
            return Socialite::driver($provider)->redirect();
        }
    }

    // Nhận dữ liệu callback từ nhà cung cấp
    public function handleProviderCallback(string $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();

            if (!$socialUser->getEmail()) {
                return redirect()->route('auth.login')->with('error', 'Tài khoản mạng xã hội của bạn không cung cấp Email.');
            }

            // 1. Kiểm tra xem Social Account này đã từng liên kết chưa
            $socialAccount = SocialAccount::where('provider', $provider)
                ->where('provider_id', $socialUser->getId())
                ->first();

            if ($socialAccount) {
                // Đã liên kết trước đó -> Đăng nhập bằng user tương ứng
                Auth::login($socialAccount->user, true);
                return redirect()->intended('/dashboard');
            }

            // 2. Nếu chưa liên kết -> Tìm User theo Email
            $user = DB::transaction(function () use ($socialUser, $provider) {
                // Nếu chưa có User -> Tạo User mới
                $user = User::firstOrCreate(
                    ['email' => $socialUser->getEmail()],
                    [
                        'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                        'email' => $socialUser->getEmail(),
                        'password' => bcrypt(Str::random(16)),
                        'email_verified_at' => now(),
                    ]
                );

                // 3. Liên kết Social Account mới với User
                $user->socialAccounts()->create([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                ]);

                return $user;
            });

            Auth::login($user, true);
            return redirect()->intended('/dashboard');

        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->route('auth.login')->with('error', 'Đăng nhập thất bại, vui lòng thử lại.');
        }
    }
}
