<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <header>
        <div class="logo">
          <img src="https://3lhowb48prep40031529g5yj-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/logo-vuejs-min.png" alt="Vue">
        </div>
        <div class="auth" v-if="!$store.getters.getToken">
          <span class="login btn btnWhite" @click="login = true">
            Login
          </span>
          <modalLogin v-show="login" @close="login = false" @change="changeModal()"/>
          <!-- registration modal -->
          <span class="login btn btnWhite" @click="registration = true">
            SignUp
          </span>
          <modalRegistration v-show="registration"
          @close="registration = false"
          @change="changeModal()" />
        </div>
        <div class="auth" v-if="$store.getters.getToken">
          <span class="login btn btnWhite" @click="logout">
            Logout
          </span>
        </div>
      </header>
      <mainComponent v-if="$store.getters.getToken"/>
    </div>
  </div>

</template>

<script>
import mainComponent from '@/components/Main.vue';
import modalLogin from '@/components/ModalLogin.vue';
import modalRegistration from '@/components/ModalRegistration.vue';

export default {
  data() {
    return {
      login: false,
      registration: false,
    };
  },
  components: {
    mainComponent,
    modalLogin,
    modalRegistration,
  },
  created() {
    this.$store.dispatch('setToken')
    this.$store.dispatch('setLogin')
    this.$store.dispatch('getPosts')
  },
  methods: {
    changeModal() {
      this.login = !this.login;
      this.registration = !this.registration;
    },
    logout() {
      this.$store.dispatch('logout')
    }
  },
}
</script>

<style>

.wrapper {
  align-items: center;
}

.wrapper-content {
  width: 960px;
}

header {
  display: flex;
  padding: 10px 0 !important;
  justify-content: space-between;
}

.logo {
  width: 120px;
}
.auth {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login {
  display: block;
  line-height: 100%;
  align-items: center;
  cursor: pointer;
}
p.changeModal {
  font-size: 12px !important;
  margin: 20px 0 !important;
}
</style>
