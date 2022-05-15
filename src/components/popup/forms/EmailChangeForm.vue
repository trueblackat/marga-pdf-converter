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
      ref="emailInput"
      v-model="email"
      type="email"
      :class="['input', {'input--is-error': isError}]"
      :placeholder="$t('email')"
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
import { email, required } from 'vuelidate/lib/validators';

export default {
  name: 'EmailChangeForm',

  data() {
    return {
      isErrorOnRequest: false,
      loading: false,
      email: '',
    };
  },

  validations: {
    email: {
      required,
      email,
    },
  },

  computed: {
    isError() {
      return this.$v.$anyError || this.isErrorOnRequest;
    },
  },

  mounted() {
    this.$refs.emailInput.focus();
  },

  methods: {
    async onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          await api.profile.changeEmail(this.email);

          this.$emit('success');
          this.isErrorOnRequest = false;
        } catch (e) {
          this.isErrorOnRequest = true;

          console.error(e);

          this.$notify.error({
            title: this.$t('messages.somethingWrongTitle'),
            message: this.$t('messages.somethingWrongText'),
          });
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
