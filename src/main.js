import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';

import '@/assets/scss/main.scss';

import store from './store';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
