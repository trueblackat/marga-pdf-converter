import SvgIcon from '@/components/SvgIcon.vue';
import loading from '@/directives/loading.directive';
import '@/plugins/svg-icons';
import i18n from '@/translates';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import Vue from 'vue';
import ClickOutside from 'vue-click-outside';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './assets/scss/main.scss';
import router from './router';
import store from './store';

dayjs.locale('ru');
dayjs.extend(relativeTime);
dayjs.extend(utc);

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

Vue.directive('loading', loading);

Vue.use(Vuelidate);
Vue.component('SvgIcon', SvgIcon);
Vue.directive('ClickOutside', ClickOutside);

window.vm = new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
