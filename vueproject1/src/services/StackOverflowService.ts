import axios from 'axios';
import { QuestionsResponseDto, QuestionsResponse } from '@/models/QuestionsResponse';
import { AnswersResponseDto, AnswersResponse } from '@/models/AnswersResponse';

export class StackOverflowService {
    // static functions since there's no persistent data stored in this class
    public static async getQuestions() {
        // stack overflow api doesn't seem to take any parameters for filtering out unanswered questions
        // currently set sort to week to fetch a decent volume of questions with accepted answers
        // so just grab the default list (without fetching full answer models for now) and filter it afterwards

        // potential further improvements: find a way to fetch a configurable number of questions with accepted answers
        const response = QuestionsResponse.createFromData((await axios.get<QuestionsResponseDto>('https://api.stackexchange.com/2.3/questions?order=desc&sort=week&site=stackoverflow')).data);

        // return a list of those that are answered, and have multiple possible answers
        return response.questions.filter(x => x.answerCount > 1 && x.hasAcceptedAnswer);
    }

    public static async getAnswersForQuestion(questionId: number) {
        // for a given question, get all the answers
        // use the '!nKzQURF6Y5' filter to retrieve actual answer content
        const response = AnswersResponse.createFromData((await axios.get<AnswersResponseDto>('https://api.stackexchange.com/2.3/questions/' + questionId + '/answers?order=desc&sort=activity&site=stackoverflow&filter=!nKzQURF6Y5')).data);

        return response.answers;
    }
}