<template>
  <div class="card" :class="{ unexpandedCard: !isExpanded }" @click="onExpandQuestion">
    {{question.title}}
    <div class="answers-container">
      <button v-for="item in answers"
              v-html=item.body
              :key="item.id"
              @click="onAnswerSelected(item.id)"
              :class="getButtonStyle(item.id)"
              :disabled='selectedAnswerId != -1'>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Question } from '@/models/Question'
import { Answer } from '@/models/Answer'
import { StackOverflowService } from '@/services/StackOverflowService'

let answers: Answer[] = [];

export default defineComponent({
  name: 'QuestionCard',
  components: {
  },
  props: {
    question: Question
  },
  data() {
    return {
      answers,
      selectedAnswerId: -1,
      isExpanded: false
    }
  },
  methods: {
    async onExpandQuestion() {
      // only expand once
      if (!this.isExpanded) {
        const stackOverflowService = new StackOverflowService();
        // shuffle the answers each time
        this.answers = this.shuffleArray(await stackOverflowService.getAnswersForQuestion(this.question!.id));
        this.isExpanded = true;
      }
    },
    shuffleArray(data: Answer[]) {
      let j, x, i;
      for (i = data.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = data[i];
        data[i] = data[j];
        data[j] = x;
      }
      return data;
    },
    onAnswerSelected(selectedId: number) {
      // buttons should be disabled after selectiom but add a second check just in case
      // if selectedAnswerId is no longer -1, that means the user has already made a selection and shouldn't be allowed to select again
      if (this.selectedAnswerId == -1) {
        this.selectedAnswerId = selectedId;
      }
    },
    getButtonStyle(answerId: number) {  // return the classes to assign to the button based on its id
      return {
        answerButton: true,
        selectedButton: this.selectedAnswerId == answerId,
        acceptedAnswer: this.selectedAnswerId != - 1 && this.answers.find(x => x.id == answerId)?.isAccepted, // if selectedAnswerId is -1, user has not chosen an answer yet
        unacceptedAnswer: this.selectedAnswerId != - 1 && !this.answers.find(x => x.id == answerId)?.isAccepted
      }
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
    border: 1px solid;
    border-radius: 8px;
    padding: 5px;
    margin: 5px 0px;
}

.unexpandedCard {
  cursor: pointer;
}

.answerButton {
  padding: 3px;
  margin: 2px;
}

.selectedButton{
  border: 5px solid;
}

.acceptedAnswer{
  border-color: green;
  background-color: lightgreen;
}

.unacceptedAnswer{
  border-color: red;
  background-color: lightcoral;
}

.answers-container {
  display: flex;
  flex-direction: column;
}
</style>
