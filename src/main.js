import VueMeta from 'vue-meta';
import SvgIcon from '@/components/SvgIcon.vue';
import loading from '@/directives/loading.directive';
import '@/plugins/svg-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import i18n from '@/translates';
import Vue from 'vue';
import ClickOutside from 'vue-click-outside';
import Vuelidate from 'vuelidate';
import Notification from 'element-ui/lib/notification';
import App from './App.vue';
import './assets/scss/main.scss';
import router from './router';
import store from './store';
import 'element-ui/packages/theme-chalk/lib/notification.css';
import 'element-ui/packages/theme-chalk/lib/icon.css';

dayjs.extend(relativeTime);
dayjs.extend(utc);

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$notify = Notification;

Vue.use(VueMeta);
Vue.use(Vuelidate);
Vue.component('SvgIcon', SvgIcon);
Vue.directive('loading', loading);
Vue.directive('ClickOutside', ClickOutside);

window.vm = new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
