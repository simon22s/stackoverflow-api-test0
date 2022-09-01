export interface AnswerDto {
    answer_id: number;
    body: string;
    is_accepted: boolean;
}

export class Answer {
    public static createFromData(data: AnswerDto): Answer {
        const answer = new Answer();

        answer.id = data.answer_id;
        answer.body = data.body;
        answer.isAccepted = data.is_accepted;

        return answer;
    }

    id: number = -1;
    body: string = 'Hello World';
    isAccepted: boolean = false;
}