<?php

namespace App\Enums;

enum MinExperience: string
{
    case LT_1 = 'lt_1';
    case EXP_1_3 = '1_3';
    case EXP_4_5 = '4_5';
    case EXP_6_10 = '6_10';
    case GT_10 = 'gt_10';

    public function label(): string
    {
        return match ($this) {
            self::LT_1 => 'Kurang dari 1 tahun',
            self::EXP_1_3 => '1-3 tahun',
            self::EXP_4_5 => '4-5 tahun',
            self::EXP_6_10 => '6-10 tahun',
            self::GT_10 => 'Lebih dari 10 tahun',
        };
    }
}
