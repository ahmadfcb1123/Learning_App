<?php

namespace App\Models\Question;

use Illuminate\Database\Eloquent\Model;
use App\Models\Question\MatchingQuestion;
use App\Models\Question\TrueFalseQuestion;
use App\Models\Question\ReorderingQuestion;
use App\Models\Question\MultipleChoiceQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuestionFactory extends Model
{
    use HasFactory;
    public static function createProduct($type, $data) {
        switch ($type) {
            case 'MultipleChoice':
                return new MultipleChoiceQuestion($data);
            case 'Matching':
                return new MatchingQuestion($data);
            case 'Reorder':
                return new ReorderingQuestion($data);
            case 'TrueFalse':
                return new TrueFalseQuestion($data);
            default:
                throw new \InvalidArgumentException("Invalid product type: $type");
        }
    }
}
