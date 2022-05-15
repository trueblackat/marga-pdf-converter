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
      {{ $t('auth.checkEnterDataMessage') }}
    </p>

    <input
      ref="newPasswordInput"
      v-model="newPassword"
      type="password"
      :class="['input', {'input--is-error': isError}]"
      :placeholder="$t('auth.newPassword')"
    >

    <input
      v-model="retypePassword"
      type="password"
      :class="['input', {'input--is-error': isError}]"
      :placeholder="$t('auth.approvePasswordMessage')"
    >

    <input
      class="button button--type-filled button--size-l"
      type="submit"
      :value="$t('actions.change')"
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

          this.$notify.error({
            title: this.$t('messages.somethingWrongTitle'),
            message: this.$t('messages.somethingWrongText'),
          });

          console.error(e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
