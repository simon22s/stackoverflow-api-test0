import { Question, QuestionDto } from '@/models/Question'

export interface QuestionsResponseDto {
    items: QuestionDto[];
}

export class QuestionsResponse {
    public static createFromData(data: QuestionsResponseDto): QuestionsResponse {
        const response = new QuestionsResponse();

        response.questions = data.items.map(x => Question.createFromData(x));

        return response;
    }

    questions: Question[] = [];
}