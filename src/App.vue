<template>
  <div class="app-container">
    <the-header class="app-container__header" />
    <router-view class="app-container__content" />
    <the-footer class="app-container__footer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TheHeader from '@/components/the/TheHeader.vue';
import TheFooter from '@/components/the/TheFooter.vue';

export default {
  name: 'App',
  components: { TheFooter, TheHeader },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('user', ['isUserInfoExited']),
  },

  watch: {
    isAuthenticated: {
      immediate: true,

      handler(isAuthenticated) {
        if (isAuthenticated && !this.isUserInfoExited) {
          this.getCurrentUserInfo();
        }
      },
    },
  },

  methods: {
    ...mapActions('user', ['getCurrentUserInfo']),
  },
};
</script>
