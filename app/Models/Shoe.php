<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shoe extends Model
{
    use HasFactory;

    protected $table = "shoes";

    protected $fillable = [
        'brand_id',
        'name',
        'size',
        'description',
        'image',
        'price',
        'total',
        'sold',
        'status'
    ];



    /**
     * @return BelongsTo
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand-id','id');
    }

}
