import Vue from 'vue';
import Vuelidate from 'vuelidate';
import '@/plugins/svg-icons';
import SvgIcon from '@/components/SvgIcon.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

Vue.use(Vuelidate);
Vue.component('SvgIcon', SvgIcon);

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
