<template>
  <header class="header">
    <router-link to="/">
      logo
    </router-link>

    <button @click="onLogout">
      Выход
    </button>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheHeader',

  methods: {
    ...mapActions('auth', ['logout']),

    onLogout() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
}
</style>
