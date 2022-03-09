<template>
  <div class="login-form-wrapper">
    <form
      class="login-form"
      @submit.prevent="onFormSubmit"
    >
      <h1 class="login-form__title title">
        Войти
      </h1>

      <input
        ref="loginInput"
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
        class="login-form__element button button--size-xl button--type-filled"
        type="submit"
        value="Вход"
        :disabled="$v.$anyError"
      >

      <button
        type="button"
        class="login-form__element text-button text-button--inverted"
        @click="showPopupRemindPassword"
      >
        Забыли пароль?
      </button>

      <div class="login-form__divider login-form__element" />

      <span>
        Нет подписки?
        <router-link
          class="login-form__element text-button text-button--inverted"
          to="/subscriptions"
        >
          Получите бесплатно
        </router-link>
      </span>
    </form>

    <popup
      ref="popupRemindPassword"
      title="Забыли пароль"
    >
      <password-remind-form @success="$refs.popupRemindPassword.close()" />
    </popup>

    <popup
      ref="popupRestorePassword"
      title="Задать новый пароль"
    >
      <password-restore-form @success="onRestorePasswordSuccess" />
    </popup>
  </div>
</template>

<script>
import PasswordRemindForm from '@/components/popup/forms/PasswordRemindForm.vue';
import PasswordRestoreForm from '@/components/popup/forms/PasswordRestoreForm.vue';
import Popup from '@/components/popup/Popup.vue';
import { minLength, required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',

  components: { Popup, PasswordRemindForm, PasswordRestoreForm },

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

  mounted() {
    if (this.$route.query.action === 'restorePassword') {
      this.$refs.popupRemindPassword.close();
      this.$refs.popupRestorePassword.show();
    } else {
      this.$refs.loginInput.focus();
    }
  },

  methods: {
    ...mapActions('auth', ['loginByLogin']),

    showPopupRemindPassword() {
      this.$refs.popupRemindPassword.show();
    },

    onRestorePasswordSuccess() {
      this.$refs.popupRestorePassword.close();
      this.$router.push({ name: 'Login' });
    },

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
