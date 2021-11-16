<template>
  <li
    class="line"
  >
    <div class="line2">
      <input
        @click="CompleteTask"
        type="checkbox"
        class="tick"
        v-bind:checked="isDone"
      >
      <span v-if="!task.edit_mode"
            :class="{ descriptionCompleted: isDone }"
            @dblclick="editTitleMode(task)"
            >
             {{ task.title }}</span>
      <input v-else
             v-model="task.title"
             type="text"
             @keyup.enter ="saveTitleMode"
             class="input"
             v-focus
      >

    </div>
    <Modal :task="task"
           @delete-task="deleteTask"
    />
  </li>
</template>

<script>
  import Modal from './Modal';

  export default {
    name: 'TaskListItem',
    components: {Modal},
    props: {
      task: {
        type: Object,
        default: () => {
        },
      },
    },

    data() {
      return {
        id: this.task.id,
        isDone: this.task.isDone,
      }

    },

    methods: {
      CompleteTask() {
        this.$emit('complete-task', this.id)
      },
      deleteTask() {
        this.$emit('delete-task', this.id)
      },
      editTitleMode(task) {
        if (task.isDone !== true) {
          this.$set(task, 'edit_mode', true);
        }
      },
      saveTitleMode() {
        this.task.edit_mode = false;
      },

    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

  }
</script>

<style scoped>
  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    padding: 6px 0 4px 10px;
    border: 1px solid #cecece;
    background: #F6F6f6;
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .line2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tick {
    transform: scale(1.5);
  }

  span {
    padding: 0px 0px 0px 10px;
  }

  .descriptionCompleted {
    text-decoration: line-through;
    color: darkgray;
  }

  .input {
    font-size: 30px;
    padding: 0px 0px 0px 10px;
    outline: none;
  }

</style>