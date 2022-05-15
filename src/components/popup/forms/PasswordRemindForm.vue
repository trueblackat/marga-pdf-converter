<template>
  <form
    v-loading="loading"
    class="popup-form"
    @submit.prevent="onSubmit"
  >
    <p class="popup-form__caption">
      {{ caption }}
    </p>

    <input
      ref="input"
      v-model="email"
      type="email"
      :class="['input', {'input--is-error': isError}]"
      :placeholder="$t('email')"
    >

    <input
      class="button button--type-filled button--size-l"
      type="submit"
      :value="$t('actions.send')"
      :disabled="$v.$anyError"
    >
  </form>
</template>

<script>
import api from '@/api';
import { email, required } from 'vuelidate/lib/validators';

export default {
  name: 'PasswordRemindForm',

  data() {
    return {
      isErrorOnRequest: false,
      loading: false,
      email: '',
    };
  },

  computed: {
    isError() {
      return this.$v.$anyError || this.isErrorOnRequest;
    },

    caption() {
      return this.isError
        ? this.$t('auth.checkEnterDataMessage')
        : this.$t('auth.setEmailForSentMessage');
    },
  },

  validations: {
    email: {
      required,
      email,
    },
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    async onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          await api.profile.remindPassword(this.email);

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
