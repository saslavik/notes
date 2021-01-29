<template>
  <modal
    title="Login"
    @close="close()">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <!-- email -->
        <div class="form-item" :class="{ errorInput: $v.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.email.required"> Field is required </p>
          <p class="errorText" v-if="!$v.email.email">
            Email is not correct!
          </p>
          <input v-model="email" :class="{ error: $v.email.$error }"
          @change="$v.email.$touch()">
        </div>
        <!-- password -->
        <div class="form-item" :class="{ errorInput: $v.password.$error }">
          <label>Password:</label>
          <p class="errorText" v-if="!$v.password.required"> Field is required </p>
          <input type="password" v-model="password" :class="{ error: $v.password.$error }"
          @change="$v.password.$touch()">
        </div>
        <!-- button -->
        <button class="btn btnPrimary">Submit</button>
      </form>
      <p class="changeModal">Do not have account? Please
        <a href="" @click.prevent="changeModal">SignUp</a>
      </p>
    </div>
    </modal>
</template>

<script>
import {
  required,
  email,
} from 'vuelidate/lib/validators';
import modal from '@/components/UI/Modal.vue';

export default {
  components: { modal },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          type: 'login',
          email: this.email,
          password: this.password,
        };
        console.log(user);
        this.email = '';
        this.password = '';
        this.$v.$reset();
        this.close();
      }
    },
    close() {
      this.$v.$reset();
      this.$emit('close');
    },
    changeModal() {
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss">

</style>
