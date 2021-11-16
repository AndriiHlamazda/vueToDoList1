<template>
  <div class="controls">
    <p class="score"
       id="todosLeft"> {{ counter }} </p>
    <p class="AllClear"
       @click="AllClearTasks">
      Clear Completed</p>
  </div>
</template>

<script>
  export default {
    name: 'Controls',
    props: {
      tasks: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      completedTasks() {
        return this.tasks.filter(task => task.isDone === true);
      },
      activeTasks() {
        return this.tasks.filter(task => task.isDone === false);
      },
      counter() {
        let interest = Math.floor(this.completedTasks.length / this.tasks.length * 100);
        if (this.tasks.length !== 0) {
          return `${this.completedTasks.length} / ${this.tasks.length} ( ${interest}% done)`;
        } else {
          return ``;
        }
      },
    },

    methods:{
      AllClearTasks() {
        this.$emit('clear-task')
      }
    },
  }
</script>

<style scoped>
  .controls {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  .AllClear:hover {
    color: cornflowerblue;
  }

</style>