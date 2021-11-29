<template>
  <div id="vue-app" class="max-w-2xl m-auto ">
    <div class="text-7xl m-14 text-white">
      <h1>Todo</h1>
    </div>
    <ul id="active">
      <TaskList :tasks="activeTasks"
                @complete-task="toggleTask"
                @delete-task="deleteTask"/>
    </ul>
    <ToDoInput
      @create-task="handleNewTask"
    />
    <div class="myTodos">
      <ul id="comp">
        <TaskList :tasks="completedTasks"
                  @complete-task="toggleTask"
                  @delete-task="deleteTask"/>
      </ul>
    </div>
    <Controls :tasks="tasks"
              @clear-task="AllClearTasks"
    />
  </div>
</template>

<script>
  import ToDoInput from './components/ToDoInput'
  import TaskList from './components/TaskList'
  import Controls from './components/Controls'

  export default {
    name: 'App',
    components: {
      ToDoInput, TaskList, Controls
    },

    data() {
      return {
        tasks: [],
      };
    },

    watch: {
      tasks: {
        handler: function () {
          const stringTask = JSON.stringify(this.tasks);
          const codeTask = btoa(stringTask);
          window.location.hash = '#' + codeTask;
        },
        deep: true
      }
    },

    computed: {
      completedTasks() {
        return this.tasks.filter(task => task.isDone === true);
      },
      activeTasks() {
        return this.tasks.filter(task => task.isDone === false);
      },
    },

    methods: {
      handleNewTask(newTask) {
        if (newTask !== '') {
          this.tasks.push({
            title: newTask,
            id: Math.random(),
            isDone: false,
            mode: true,
          });
        }
      },
      toggleTask(id) {
        const i = this.tasks.findIndex(task => task.id === +id);
        if (i !== -1) {
          this.tasks[i].isDone = !this.tasks[i].isDone;
          this.tasks[i].mode = true;
        }
      },
      deleteTask(id) {
        const i = this.tasks.findIndex(task => task.id === +id);
        if (i !== -1) {
          this.tasks.splice(i, 1);
        }
      },
      AllClearTasks() {
        this.tasks = this.tasks.filter(task => {
          return !task.isDone
        });
      },

    },

    created: function () {
      const h = window.location.hash;
      if (h.length !== 0) {
        const h2 = h.substring(1);
        const hash = atob(h2);
        this.tasks = JSON.parse(hash);
      }
    },
  }
</script>

<style>
  body {
    background-image: url(assets/1559370648_6.jpeg);
    background-size: 100% 26%;
    background-repeat: no-repeat;
    cursor: default;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100vw;
  }
</style>
