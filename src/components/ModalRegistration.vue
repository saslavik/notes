<template>
  <modal
    title="Registration"
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
          <p class="errorText" v-if="!$v.password.minLength">
            Password must have at least {{ $v.password.$params.minLength.min }}!
          </p>
          <input type="password" v-model="password" :class="{ error: $v.password.$error }"
          @change="$v.password.$touch()">
        </div>
        <!-- repeatPassword -->
        <div class="form-item" :class="{ errorInput: notSame }">
          <label>Repeat password:</label>
          <p class="errorText" v-if="notSame"> Passwords are not same </p>
          <input type="password" v-model="repeatPassword"
          :class="{ error: notSame }">
        </div>

        <!-- button -->
        <button class="btn btnPrimary">Submit</button>
      </form>
      <p class="changeModal">Already have account? Please
        <a href="" @click.prevent="changeModal">Login</a>
      </p>
    </div>
    </modal>
</template>

<script>
import {
  required,
  minLength,
  sameAs,
  email,
} from 'vuelidate/lib/validators';
import modal from '@/components/UI/Modal.vue';

export default {
  components: { modal },
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      notSame: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('regUser', user)
          .then((res) => {
            this.$v.$reset();
            this.close();
          })
          .catch(e => {
            user.email = '',
            user.password = ''
            console.log(e);
          })
        console.log(user);
      } else if (this.$v.repeatPassword.$invalid) {
        this.$v.$reset();
        this.notSame = true;
        this.password = '';
        this.repeatPassword = '';
      }
    },
    close() {
      this.password = '';
      this.repeatPassword = '';
      this.$v.$reset();
      this.$emit('close');
    },
    changeModal() {
      this.password = '';
      this.repeatPassword = '';
      this.notSame = false;
      this.$v.$reset();
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss">
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
