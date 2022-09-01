import { Answer, AnswerDto } from '@/models/Answer'

export interface AnswersResponseDto {
    items: AnswerDto[];
}

export class AnswersResponse {
    public static createFromData(data: AnswersResponseDto): AnswersResponse {
        const response = new AnswersResponse();

        response.answers = data.items.map(x => Answer.createFromData(x));

        return response;
    }

    answers: Answer[] = [];
}