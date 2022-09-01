<template>
    <div class="card">
        {{question.title}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Question } from '@/models/Question'

export default defineComponent({
  name: 'QuestionCard',
  components: {
    },
    props: {
        question: Question
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
</style>
