<template>
  <div class="app-container">
    <the-header class="app-container__header" />

    <router-view class="app-container__content" />

    <the-footer class="app-container__footer" />

    <paywall />
  </div>
</template>

<script>
import Paywall from '@/components/Paywall.vue';
import TheFooter from '@/components/the/TheFooter.vue';
import TheHeader from '@/components/the/TheHeader.vue';
import { intervalUntil } from '@/utils/api.utils';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'App',

  components: { Paywall, TheFooter, TheHeader },

  computed: {
    ...mapState('auth', ['tokenExpires']),
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('user', ['isUserInfoExited']),
  },

  watch: {
    isAuthenticated: {
      immediate: true,

      handler(isAuthenticated) {
        if (isAuthenticated) {
          this.getFiles();

          if (!this.isUserInfoExited) {
            this.getCurrentUserInfo();
          }
        }
      },
    },

    tokenExpires: {
      immediate: true,
      handler(value) {
        intervalUntil(value, this.refreshToken);
      },
    },
  },

  methods: {
    ...mapActions('auth', ['refreshToken']),
    ...mapActions('user', ['getCurrentUserInfo']),
    ...mapActions('files', ['getFiles']),
  },
};
</script>
