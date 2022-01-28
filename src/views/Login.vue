<template>
  <div class="login-page auth-form-wrapper">
    <login-by-login />
  </div>
</template>

<script>
import LoginByLogin from '@/components/auth/LoginByLogin.vue';

export default {
  name: 'LoginPage',
  components: { LoginByLogin },
};
</script>
