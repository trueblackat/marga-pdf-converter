<template>
  <form
    class="login-form"
    @submit.prevent="onFormSubmit"
  >
    <h1 class="login-form__title title">
      Войти
    </h1>

    <input
      v-model.trim="$v.login.$model"
      class="login-form__element input"
      type="text"
      placeholder="Логин"
    >

    <input
      v-model.trim="$v.password.$model"
      class="login-form__element input"
      type="password"
      placeholder="Пароль"
    >

    <input
      class="login-form__element button button--size-big button--type-filled"
      type="submit"
      value="Вход"
      :disabled="$v.$anyError"
    >

    <router-link
      class="login-form__element text-button text-button--inverted"
      to="/password-recovery"
    >
      Забыли пароль?
    </router-link>

    <div class="login-form__divider login-form__element" />

    <span>
      Нет подписки?
      <router-link
        class="login-form__element text-button text-button--inverted"
        to="/subscription"
      >
        Получить подписку
      </router-link>
    </span>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'LoginForm',

  data() {
    return {
      login: '',
      password: '',
    };
  },

  validations: {
    login: {
      required,
      minLength: minLength(4),
    },

    password: {
      required,
      minLength: minLength(6),
    },
  },

  methods: {
    ...mapActions('auth', ['loginByLogin']),

    async onFormSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.error('ERROR IN FORM');
      } else {
        const params = {
          login: this.login,
          password: this.password,
        };

        await this.loginByLogin(params);
      }
    },
  },
};
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  text-align: center;

  &__title {
    margin-bottom: 50px;
  }

  &__element {
    margin-bottom: $base-gap;
  }

  &__divider {
    border-bottom: 1px solid $color-border;
  }
}
</style>
