import SvgIcon from '@/components/SvgIcon.vue';
import '@/plugins/svg-icons';
import Vue from 'vue';
import ClickOutside from 'vue-click-outside';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './assets/scss/main.scss';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

Vue.use(Vuelidate);
Vue.component('SvgIcon', SvgIcon);
Vue.directive('ClickOutside', ClickOutside);

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
