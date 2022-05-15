<template>
  <main class="login-page container">
    <picture class="login-page__image">
      <img
        src="@/assets/images/login-page-image.svg"
        alt="login-page-back"
      >
    </picture>

    <login-form class="login-page__form" />
  </main>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
  name: 'LoginPage',

  metaInfo() {
    return {
      titleTemplate: `%s - ${this.$t('pageNames.login')}`,
    };
  },

  components: { LoginForm },
};
</script>

<style lang="scss">
.login-page {
  padding-top: 70px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;

  &__image {
    flex-grow: 1;
    padding: $base-gap;

    img {
      margin: 0 auto;
    }
  }

  &__form {
    width: 100%;
    max-width: 370px;
  }
}
</style>
