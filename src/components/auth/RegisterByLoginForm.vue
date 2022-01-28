<template>
  <form
    class="auth-form"
    @submit.prevent="onFormSubmit"
  >
    <h1>Регистрация по логину</h1>

    <input
      v-model.trim.lazy="$v.email.$model"
      type="email"
      placeholder="email"
    >

    <input
      v-model.trim.lazy="$v.login.$model"
      type="text"
      placeholder="login"
    >

    <input
      v-model.trim.lazy="$v.password.$model"
      type="password"
      placeholder="password"
    >

    <input
      v-model.trim.lazy="$v.passwordRetype.$model"
      type="password"
      placeholder="password retype"
    >

    <input
      type="submit"
      value="Зарегистрироваться"
      :disabled="$v.$anyError"
    >

    <router-link to="/login">
      Есть профиль? Войти
    </router-link>
  </form>
</template>

<script>
import {
  required,
  email,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'RegisterByLoginForm',

  data() {
    return {
      email: '',
      login: '',
      password: '',
      passwordRetype: '',
    };
  },

  validations: {
    email: {
      required,
      email,
    },

    login: {
      required,
      minLength: minLength(4),
    },

    password: {
      required,
      minLength: minLength(6),
    },

    passwordRetype: {
      sameAsPassword: sameAs('password'),
    },
  },

  methods: {
    ...mapActions('auth', ['registerByLogin']),

    async onFormSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        console.error('ERROR IN FORM');
      } else {
        const params = {
          login: this.login,
          email: this.email,
          password: this.password,
        };

        await this.registerByLogin(params);
      }
    },
  },
};
</script>
