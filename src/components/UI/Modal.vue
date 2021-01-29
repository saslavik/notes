<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">

        <!-- header -->
        <div class="modal-header">
          <span class="modal-title"> {{ title }} </span>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>

        <!-- body -->
        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.body.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') this.$emit('close');
    });
  },
};
</script>

<style lang="scss" scoped>
.modal-enter, .modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}

.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity .3s ease;
  z-index: 998;
  background-color: rgba(0,0,0,.48);
}

.modal-content {
  position: relative;
  min-width: 600px;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all .3s ease;
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding-bottom: 20px;
  span {
    font-size: 24px;
  }
  .button-close {
    cursor: pointer;
  }
}

.modal-body {
  text-align: center;
}

.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4 px;
  color: #de4040;
}

.form-item {
  &.errorInput .errorText {
    display: block;
  }
}

input.error {
  border-color: #de4040;
}

</style>
