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
        to="/terms-and-conditions"
      >
        Информация
      </router-link>

      <router-link
        v-if="!isAuthenticated"
        class="header__link text-button"
        to="/login"
      >
        Войти
      </router-link>

      <router-link
        v-if="!isAuthenticated"
        class="button"
        to="/subscriptions"
      >
        Подписка
      </router-link>

      <user-nav
        v-if="isAuthenticated && isUserInfoExited"
        :username="user.login"
      />
    </nav>
  </header>
</template>

<script>
import UserNav from '@/components/UserNav.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'TheHeader',
  components: { UserNav },
  computed: {
    ...mapState('user', ['user']),
    ...mapGetters('user', ['isUserInfoExited']),
    ...mapGetters('auth', ['isAuthenticated']),
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
