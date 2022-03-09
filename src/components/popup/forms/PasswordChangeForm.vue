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
      v-model="oldPassword"
      type="password"
      :class="['input', {'input--is-error': isError}]"
      placeholder="Старый пароль"
    >

    <input
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
import { mapActions } from 'vuex';

export default {
  name: 'PasswordChangeForm',

  data() {
    return {
      loading: false,
      isErrorOnRequest: false,
      oldPassword: '',
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
    oldPassword: {
      required,
      minLength: minLength(4),
    },

    newPassword: {
      required,
      minLength: minLength(6),
    },

    retypePassword: {
      sameAsPassword: sameAs('newPassword'),
    },
  },

  methods: {
    ...mapActions('user', ['getCurrentUserInfo']),

    async onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          await api.profile.changePassword(this.oldPassword, this.newPassword);

          await this.getCurrentUserInfo();
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
