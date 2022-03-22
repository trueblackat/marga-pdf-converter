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

      <the-lang-changer class="header__link" />

      <router-link
        class="header__link text-button"
        to="/terms-and-conditions"
      >
        {{ $t('info') }}
      </router-link>

      <router-link
        v-if="!isAuthenticated"
        class="header__link text-button"
        to="/login"
      >
        {{ $t('actions.enter') }}
      </router-link>

      <router-link
        v-if="!isAuthenticated"
        class="button"
        to="/subscriptions"
      >
        {{ $t('subscription') }}
      </router-link>

      <user-nav
        v-if="isAuthenticated && isUserInfoExited"
        :username="computedLogin"
      />
    </nav>
  </header>
</template>

<script>
import TheLangChanger from '@/components/the/TheLangChanger.vue';
import UserNav from '@/components/UserNav.vue';
import userMixin from '@/mixins/user.mixin';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'TheHeader',

  components: { TheLangChanger, UserNav },

  mixins: [userMixin],

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
