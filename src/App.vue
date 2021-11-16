<template>
  <div id="vue-app">
    <HelloWorld
    />
    <ul class="todo-list" id="active">
      <TaskList :tasks="activeTasks"
                @complete-task="toggleTask"
                @delete-task="deleteTask"/>
    </ul>
    <ToDoInput
      @create-task="handleNewTask"
    />
    <div class="myTodos">
      <ul class="todo-list" id="comp">
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
  import HelloWorld from './components/HelloWorld'
  import ToDoInput from './components/ToDoInput'
  import TaskList from './components/TaskList'
  import Controls from './components/Controls'

  export default {
    name: 'App',
    components: {
      HelloWorld, ToDoInput, TaskList, Controls
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
          });
        }
      },
      toggleTask(id) {
        const i = this.tasks.findIndex(task => task.id === +id);
        if (i !== -1) {
          this.tasks[i].isDone = !this.tasks[i].isDone;
          this.tasks[i].edit_mode = false;
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
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  body {
    background-image: url(assets/1559370648_6.jpeg);
    background-size: 100% 26%;
    background-repeat: no-repeat;
    cursor: default;
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
  }

  #vue-app {
    max-width: 700px;
    margin: 0px auto;
    min-height: 100vh;
  }

  .todo-list {
    list-style-type: none;
    padding: 1px;
  }
</style>
