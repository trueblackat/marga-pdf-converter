<template>
  <div class="register-page auth-form-wrapper">
    <register-by-login-form />
  </div>
</template>

<script>
import RegisterByLoginForm from '@/components/auth/RegisterByLoginForm.vue';

export default {
  name: 'LoginPage',
  components: { RegisterByLoginForm },
};
</script>
