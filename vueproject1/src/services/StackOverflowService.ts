import axios from 'axios';
import { QuestionsResponseDto, QuestionsResponse } from '@/models/QuestionsResponse';
import { AnswersResponseDto, AnswersResponse } from '@/models/AnswersResponse';

export class StackOverflowService {
    public async getQuestions() {
        // stack overflow api doesn't seem to take any parameters for filtering unanswered questions
        // so just grab the default list (excluding full answer models for now) and filter it afterwards
        const response = QuestionsResponse.createFromData((await axios.get<QuestionsResponseDto>('https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&site=stackoverflow')).data);

        // return a list of those that are answered
        return response.questions.filter(x => x.answerCount > 0 && x.isAnswered);
    }

    public async getAnswersForQuestion(questionId: number) {
        // for a given question, get all the answers
        // use the '!nKzQURF6Y5' filter to retrieve actual answer content
        const response = AnswersResponse.createFromData((await axios.get<AnswersResponseDto>('https://api.stackexchange.com/2.3/questions/' + questionId + '/answers?order=desc&sort=activity&site=stackoverflow&filter=!nKzQURF6Y5')).data);

        return response.answers;
    }
}