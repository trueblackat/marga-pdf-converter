<template>
  <form
    v-loading="loading"
    class="popup-form"
    @submit.prevent="onSubmit"
  >
    <p
      v-if="isError"
      class="popup-form__caption"
    >
      Проверьте правильность введенных данных
    </p>

    <input
      ref="newPasswordInput"
      v-model="newPassword"
      type="password"
      :class="['input', {'input--is-error': isError}]"
      placeholder="Новый пароль"
    >

    <input
      v-model="retypePassword"
      type="password"
      :class="['input', {'input--is-error': isError}]"
      placeholder="Подтвердите пароль"
    >

    <input
      class="button button--type-filled button--size-l"
      type="submit"
      value="Изменить"
      :disabled="$v.$anyError"
    >
  </form>
</template>

<script>
import api from '@/api';
import { minLength, required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'PasswordRestoreForm',

  data() {
    return {
      loading: false,
      isErrorOnRequest: false,
      newPassword: '',
      retypePassword: '',
    };
  },

  computed: {
    isError() {
      return this.$v.$anyError || this.isErrorOnRequest;
    },
  },

  validations: {
    newPassword: {
      required,
      minLength: minLength(6),
    },

    retypePassword: {
      sameAsPassword: sameAs('newPassword'),
    },
  },

  mounted() {
    this.$refs.newPasswordInput.focus();
  },

  methods: {
    async onSubmit() {
      this.$v.$touch();

      const { code, user_id: userId } = this.$route.query;

      if (!this.$v.$invalid && code && userId) {
        try {
          this.loading = true;
          await api.profile.restorePassword(userId, code, this.newPassword);

          this.$emit('success');
          this.isErrorOnRequest = false;
        } catch (e) {
          this.isErrorOnRequest = true;

          console.error(e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
