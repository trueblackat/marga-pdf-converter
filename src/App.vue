<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',

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
