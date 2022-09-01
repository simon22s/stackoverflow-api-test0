<template>
  <div class="card" @click="onExpandQuestion">
    {{question.title}}
    <div class="questions-container">
      <button class="answer-button" v-for="item in answers"
              v-html=item.body
              :key="item.id"></button>
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
      answers
    }
  },
  methods: {
    async onExpandQuestion() {
      const stackOverflowService = new StackOverflowService();
      this.answers = await stackOverflowService.getAnswersForQuestion(this.question!.id);
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

.answer-button{
  padding: 3px;
  margin: 2px;
}
</style>
