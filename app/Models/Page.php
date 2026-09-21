<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Table('pages')]
#[Fillable('user_id', 'name', 'slug', 'status', 'content', 'gjs_data')]
class Page extends Model
{
    use SoftDeletes;
}
