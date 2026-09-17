<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('social_accounts')]
#[Fillable(['user_id', 'avatar', 'provider', 'provider_id', 'access_token', 'refresh_token', 'expires_at'])]
class SocialAccount extends Model
{
    protected $casts = [
        'expires_at' => 'datetime',
    ];
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
