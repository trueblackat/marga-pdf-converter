<template>
  <div class="login-page auth-form-wrapper">
    <the-header />
    <login-by-login />
  </div>
</template>

<script>
import LoginByLogin from '@/components/auth/LoginByLogin.vue';
import TheHeader from '@/components/the/TheHeader.vue';

export default {
  name: 'LoginPage',
  components: { TheHeader, LoginByLogin },
};
</script>
