import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

Vue.use(Vuelidate);

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
