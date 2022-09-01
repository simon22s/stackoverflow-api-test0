<template>
    <div class="questions-container">
        <QuestionCard v-for="item in questions"
                      :question="item"
                      :key="item.id"></QuestionCard>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuestionCard from './components/QuestionCard.vue'
import { StackOverflowService } from './services/StackOverflowService'
import { Question } from './models/Question'

let questions: Question[] = [];

export default defineComponent({
  name: 'App',
  components: {
    QuestionCard
  },
  data() {
    return {
        questions
    }
  },
  async created() {
    const stackOverflowService = new StackOverflowService();
    this.questions = await stackOverflowService.getQuestions();
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

.questions-container{
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
}
</style>
