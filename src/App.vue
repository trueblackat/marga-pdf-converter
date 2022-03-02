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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: { Paywall, TheFooter, TheHeader },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('user', ['isUserInfoExited']),
  },

  watch: {
    isAuthenticated: {
      immediate: true,

      handler(isAuthenticated) {
        this.getFiles();

        if (isAuthenticated) {
          if (!this.isUserInfoExited) {
            this.getCurrentUserInfo();
          }
        }
      },
    },
  },

  methods: {
    ...mapActions('user', ['getCurrentUserInfo']),
    ...mapActions('files', ['getFiles']),
  },
};
</script>
