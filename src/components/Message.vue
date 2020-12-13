<template>
  <div class="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      // required: true,
      default: 'Default',
    }
  },
};
</script>

<style lang="scss" scoped>
  p {
    color: red;
    margin: 10px 0px;
  }
  .message {
    text-align: center;
    padding: 20px;
  }
</style>
