import api from '@/api';
import localStorageDb from '@/utils/localStorageDB.utils';

export default {
  namespaced: true,

  state: () => ({
    token: localStorageDb.get('token') || null,
    loading: false,
  }),

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorageDb.put('token', token);
    },

    CLEAR_TOKEN(state) {
      state.token = null;
      localStorageDb.delete('token');
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    async loginByLogin({ commit }, { login, password }) {
      try {
        commit('SET_LOADING', true);
        const tokenData = await api.auth.loginByLogin({ login, password });

        commit('SET_TOKEN', tokenData.access_token);
        commit('SET_LOADING', false);

        await window.vm.$router.push({ name: 'Home' });
      } catch (error) {
        commit('SET_LOADING', false);
        console.error(error);
      }
    },

    async registerByLogin({ commit }, { login, email, password }) {
      try {
        commit('SET_LOADING', true);
        const tokenData = await api.auth.registerByLoginEmailPass({ login, email, password });

        commit('SET_TOKEN', tokenData.access_token);
        commit('SET_LOADING', false);

        await window.vm.$router.push({ name: 'Home' });
      } catch (error) {
        commit('SET_LOADING', false);
        console.error(error);
      }
    },

    async logout({ commit, dispatch }) {
      commit('CLEAR_TOKEN');
      dispatch('user/clearUser', null, { root: true });

      await api.auth.revokeToken();
      await window.vm.$router.push({ name: 'Login' });
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
};
