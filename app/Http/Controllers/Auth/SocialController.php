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
            /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
            $driver = Socialite::driver('google');
            return $driver
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
                return redirect()->route('auth.login')->with('error', __('your social media account does not provide an email address'));
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
                // Lấy user đang đăng nhập (nếu có) hoặc tìm/tạo User theo Email
                $user = Auth::user() ?? User::firstOrCreate(
                    ['email' => $socialUser->getEmail()],
                    [
                        'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                        'email' => $socialUser->getEmail(),
                        'password' => bcrypt(Str::random(16)),
                        'email_verified_at' => now(),
                    ]
                );

                // 3. Liên kết Social Account mới với User
                $user->socialAccounts()->updateOrCreate(
                    [ 'provider' => $provider ],
                    [
                        'provider_id' => $socialUser->getId(),
                        'avatar'        => $socialUser->getAvatar(),
                        'access_token'  => json_encode($socialUser->token),
                        'refresh_token' => $socialUser->refreshToken ?? $user->socialAccounts()->where('provider', $provider)->value('refresh_token'),
                        'expires_at'    => isset($socialUser->expiresIn) ? now()->addSeconds($socialUser->expiresIn) : null,
                    ]
                );

                return $user;
            });

            Auth::login($user, true);
            return redirect()->intended('/dashboard')->with('success', __('successfully connected :provider account', ['provider' => ucfirst($provider)]));;

        } catch (Exception $e) {
            Log::error($e->getMessage());
            return redirect()->route('auth.login')->with('error', __('login failed, please try again'));
        }
    }
}
