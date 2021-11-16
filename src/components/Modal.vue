<template>
  <div class="Modal">
    <i class="material-icons"
       @click="showModal"
    >
      clear
    </i>
    <div class="modal"
         v-if="isInfoModal">
      <div class="modal__body">
        <div class="modal__content">
            <span>Are you sure you want to delete task "{{task.title}}" ?</span>
          <div class="but">
            <button id="yes"
                    class="button"
                    @click="deleteTask"
            >YES</button>
            <button id="no"
                    class="button"
                    @click="closeModal"
            >NO</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Modal',

    data() {
      return {
        isInfoModal: false,
      };
    },

    props: {
      task: {
        type: Object,
        default: () => {},
      },
    },

    methods: {
      showModal() {
        this.isInfoModal = true;
      },
      closeModal() {
        this.isInfoModal = false;
      },
      deleteTask(id){
        this.$emit('delete-task', id)
      },
    },
  }

</script>

<style scoped>
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    opacity: 1;
    visibility: visible;
  }

  .modal__body {
    min-height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
  }

  .modal__content {
    background-color: aqua;
    color: black;
    max-width: 800px;
    padding: 30px;
    border: 4px double black;
    font-size: 20px;
  }

  .but {
    display: flex;
    justify-content: center;
  }

  .button {
    width: 80px;
    height: 25px;
    margin: 30px 10px 0px 10px;

  }

</style>