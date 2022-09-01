import { Answer, AnswerDto } from '@/models/Answer'

export interface QuestionDto {
    question_id: number;
    title: string;
    answer_count: number;
    is_answered: boolean;
    answers: AnswerDto[];
}

export class Question {
    public static createFromData(data: QuestionDto) : Question {
        const question = new Question();

        question.id = data.question_id;
        question.title = data.title;
        question.answerCount = data.answer_count;
        question.isAnswered = data.is_answered;

        // answer array can be empty
        question.answers = data.answers ? data.answers.map(x => Answer.createFromData(x)) : [];

        return question;
    }

    id: number = -1;
    title: string = '';
    answerCount: number = 0;
    isAnswered: boolean = false;
    answers: Answer[] = [];
}