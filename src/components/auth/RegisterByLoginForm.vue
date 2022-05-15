<template>
  <form
    v-loading="loading"
    class="auth-form"
    @submit.prevent="onFormSubmit"
  >
    <input
      v-model.trim.lazy="$v.email.$model"
      :class="['auth-form__element input', {'input--is-error': $v.email.$anyError}]"
      type="email"
      :placeholder="$t('email')"
    >

    <input
      v-model.trim.lazy="$v.password.$model"
      :class="['auth-form__element input', {'input--is-error': $v.email.$anyError}]"
      type="password"
      :placeholder="$t('password')"
    >

    <input
      v-model.trim="$v.passwordRetype.$model"
      :class="['auth-form__element input', {'input--is-error': $v.email.$anyError}]"
      type="password"
      :placeholder="$t('passwordRetype')"
    >

    <input
      class="auth-form__element button button--size-xl button--type-filled"
      type="submit"
      :value="submitButtonLabel || this.$t('register')"
      :disabled="$v.$anyError"
    >
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

  props: {
    submitButtonLabel: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: false,
      email: '',
      password: '',
      passwordRetype: '',
    };
  },

  validations: {
    email: {
      required,
      email,
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
    ...mapActions('user', ['getCurrentUserInfo']),

    async onFormSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;

      try {
        const params = {
          email: this.email,
          password: this.password,
        };

        await this.registerByLogin(params);
        await this.getCurrentUserInfo();

        this.$emit('success');
      } catch (e) {
        console.error(e);
        this.$emit('error', e);

        this.$notify.error({
          title: this.$t('messages.somethingWrongTitle'),
          message: this.$t('messages.somethingWrongText'),
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
