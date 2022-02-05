<template>
  <header class="header">
    <nav class="header__inner container">
      <router-link
        class="header__logo"
        to="/"
      >
        <svg-icon name="logo" />
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
        to="/subscriptions"
      >
        Подписка
      </router-link>
    </nav>
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
  box-shadow: $base-shadow;

  &__inner {
    display: flex;
    align-items: center;
    padding: $base-gap / 2 0;
    height: 100%;
  }

  &__gutter {
    flex-grow: 1;
  }

  &__logo {
    flex-shrink: 0;

    .svg-icon {
      width: 162px;
      height: 24px;
      color: $color-theme;
    }
  }

  &__link {
    margin-right: 30px;
  }
}
</style>
