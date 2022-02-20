import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import files from './modules/files';
import subscriptions from './modules/subscriptions';
import system from './modules/system';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    subscriptions,
    system,
    files,
  },
});
