<template>
  <header class="header">
    <div class="header__inner container">
      <router-link
        class="header__logo"
        to="/"
      >
        <img
          src="@/assets/images/logo.svg"
          alt="PDFeditor"
        >
      </router-link>

      <div class="header__gutter" />

      <router-link
        class="header__link text-button"
        to="/info"
      >
        Информация
      </router-link>

      <router-link
        class="header__link text-button"
        to="/login"
      >
        Войти
      </router-link>

      <router-link
        class="button"
        to="/subscription"
      >
        Подписка
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheHeader',

  methods: {
    ...mapActions('auth', ['logout']),

    onLogout() {
      console.log('onLogout');
      // this.logout();
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
  height: $header-height;
  background: $c-white;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);

  &__inner {
    display: flex;
    align-items: center;
    padding: $site-padding / 2 0;
    height: 100%;
  }

  &__gutter {
    flex-grow: 1;
  }

  &__logo {
    flex-shrink: 0;
  }

  &__link {
    margin-right: 30px;
  }
}
</style>
