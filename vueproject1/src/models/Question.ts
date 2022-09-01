export interface QuestionDto {
    question_id: number;
    title: string;
    answer_count: number;
    accepted_answer_id: number;
}

export class Question {
    public static createFromData(data: QuestionDto) : Question {
        const question = new Question();

        question.id = data.question_id;
        question.title = data.title;
        question.answerCount = data.answer_count;
        question.hasAcceptedAnswer = data.accepted_answer_id !== undefined;

        return question;
    }

    id: number = -1;
    title: string = '';
    answerCount: number = 0;
    hasAcceptedAnswer: boolean = false;
}