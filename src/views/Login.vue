<template>
  <div class="login-page">
    <the-header />

    <div class="login-page__inner container">
      <div class="login-page__image">
        <img
          src="@/assets/images/login-page-image.svg"
          alt="login-page-back"
        >
      </div>

      <login-form class="login-page__form" />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';
import TheHeader from '@/components/the/TheHeader.vue';

export default {
  name: 'LoginPage',
  components: { TheHeader, LoginForm },
};
</script>

<style lang="scss">
.login-page {
  padding: 70px 0 100px;

  &__inner {
    display: flex;
    align-items: center;
  }

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
