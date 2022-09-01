export interface AnswerDto {
    body: string;
    is_accepted: boolean;
}

export class Answer {
    public static createFromData(data: AnswerDto): Answer {
        const answer = new Answer();

        answer.body = data.body;
        answer.isAccepted = data.is_accepted;

        return answer;
    }

    body: string = 'Hello World';
    isAccepted: boolean = false;
}