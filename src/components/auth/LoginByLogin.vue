<template>
  <form
    class="auth-form"
    @submit.prevent="onFormSubmit"
  >
    <h1>Вход по логину</h1>

    <input
      v-model.trim="$v.login.$model"
      type="text"
      placeholder="login"
    >

    <input
      v-model.trim="$v.password.$model"
      type="password"
      placeholder="password"
    >

    <input
      type="submit"
      value="Вход"
      :disabled="$v.$anyError"
    >

    <router-link to="/register">
      Нет профиля? Зарегистрироваться
    </router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'LoginByLogin',

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
