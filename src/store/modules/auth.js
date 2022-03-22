import api from '@/api';
import localStorageDb from '@/utils/localStorageDB.utils';
import dayjs from 'dayjs';

export default {
  namespaced: true,

  state: () => ({
    token: localStorageDb.get('token') || null,
    tokenExpires: localStorageDb.get('tokenExpires') || null,
    loading: false,
  }),

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorageDb.put('token', token);
    },
    SET_TOKEN_EXPIRES(state, date) {
      state.tokenExpires = date;
      localStorageDb.put('tokenExpires', date);
    },

    CLEAR_TOKEN_DATA(state) {
      state.token = null;
      localStorageDb.delete('token');
      localStorageDb.delete('tokenExpires');
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    async loginByLogin({ commit, dispatch }, { login, password }) {
      try {
        commit('SET_LOADING', true);

        await dispatch(
          'tokenWork',
          {
            requestMethod: api.auth.loginByLogin,
            params: { login, password },
          },
        );

        await window.vm.$router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async refreshToken({ commit, dispatch }) {
      try {
        commit('SET_LOADING', true);

        await dispatch(
          'tokenWork',
          {
            requestMethod: api.auth.refreshToken,
          },
        );
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async registerByLogin({ commit, dispatch }, { email, password }) {
      try {
        commit('SET_LOADING', true);

        await dispatch(
          'tokenWork',
          {
            requestMethod: api.auth.registerByLoginEmailPass,
            params: { email, password },
          },
        );

        await window.vm.$router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit, dispatch }) {
      commit('CLEAR_TOKEN_DATA');
      dispatch('user/clearUser', null, { root: true });

      if (window.vm.$route.name !== 'Login') {
        await window.vm.$router.push({ name: 'Login' });
      }
    },

    async tokenWork({ commit }, { requestMethod, params = {} }) {
      try {
        const { access_token: token, expires: tokenExpires } = await requestMethod(params);

        commit('SET_TOKEN', token);
        commit('SET_TOKEN_EXPIRES', dayjs(tokenExpires).valueOf());

        return Promise.resolve(token);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
};
