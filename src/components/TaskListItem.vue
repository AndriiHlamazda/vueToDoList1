<template>
  <div>
  <li
    class="flex justify-between items-center text-3xl border-solid border-2 border-grey bg-gray-100 rounded my-0,5 px-2.5 py-2"
  >
    <div class="flex justify-between items-center">
      <input
        @click="CompleteTask"
        type="checkbox"
        class="transform scale-150"
        :checked="isDone"
      >
      <span v-if="mode"
            class="ml-2"
            :class="{ [`line-through text-gray-500`]: isDone }"
            @dblclick="editTitleMode"
            >
             {{ task.title }}</span>
      <input v-else
             v-model="task.title"
             type="text"
             @keyup.enter ="saveTitleMode"
             class="outline-none ml-2"
             v-focus
      >
    </div>
    <i class="material-icons"
       @click="modalShow">
      clear
    </i>
  </li>
  <Modal :task="task"
         v-if="isInfoModal"
         @delete-task="deleteTask"
         @close-modal="closeModal"
  />
  </div>
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
        isInfoModal: false,
        mode: this.task.mode,
      }
    },

    methods: {
      closeModal() {
        this.isInfoModal = false;
      },
      CompleteTask() {
        this.$emit('complete-task', this.id)
      },
      deleteTask() {
        this.$emit('delete-task', this.id)
      },
      editTitleMode() {
        if (this.task.isDone !== true) {
          this.mode = false;
        }
      },
      saveTitleMode() {
        this.mode = true;
      },
      modalShow() {
        this.isInfoModal = true;
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
