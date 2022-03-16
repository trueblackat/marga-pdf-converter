<template>
  <div
    v-loading="loading"
    class="popup-form"
  >
    <p class="popup-form__caption">
      {{ formCaption }}
    </p>

    <input
      ref="input"
      v-model="code"
      type="text"
      :class="['input', {'input--is-error': isError}]"
      :placeholder="$t('code')"
    >

    <!--    <p class="popup-form__question">-->
    <!--      <span>Не пришел код?</span>-->

    <!--      <button class="text-button text-button&#45;&#45;inverted">-->
    <!--        Отправить еще раз-->
    <!--      </button>-->
    <!--    </p>-->

    <button
      class="button button--type-filled button--size-l"
      :disabled="code.length < 4"
      @click="confirm"
    >
      {{ $t('actions.approve') }}
    </button>
  </div>
</template>

<script>
import api from '@/api';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EmailConfirmForm',

  data() {
    return {
      loading: false,
      isError: false,
      code: this.$route.query.code || '',
    };
  },

  computed: {
    ...mapState('user', ['user']),

    formCaption() {
      return this.isError
        ? this.$t('auth.incorrectCodeMessage')
        : this.$t('auth.typeCodeMessage');
    },
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    ...mapActions('user', ['setUser']),

    async confirm() {
      try {
        this.loading = true;

        await api.profile.confirmEmail(
          this.code,
          this.user.email,
          this.user.id,
        );

        this.$emit('success');
      } catch (e) {
        this.isError = true;
        this.$refs.input.focus();

        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
