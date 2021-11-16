<template>
  <div class="ToDoInput">
    <input
      id="todos"
      type="text"
      placeholder="Create a new todo..."
      v-model="newTask"
      @keyup.enter="addTask"
    />
  </div>
</template>

<script>
  export default {
    name: 'ToDoInput',

    props: {
      tasks: {
        type: Array,
        default: () => [],
      },

    },

    data() {
      return {
        newTask: ''
      }
    },


    methods: {
      addTask() {
        this.$emit('create-task', this.newTask)
        this.newTask = ''
      }
    }
  }

</script>

<style scoped>
  #todos {
    width: 685px;
    font-size: 30px;
    padding: 6px 0px 4px 10px;
    border: 1px solid #cecece;
    background: #F6F6f6;
    border-radius: 4px;
  }

</style>