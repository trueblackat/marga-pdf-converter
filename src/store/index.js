import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import subscriptions from './modules/subscriptions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    user,
    subscriptions,
  },
});
