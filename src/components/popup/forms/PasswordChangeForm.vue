<template>
  <div class="popup-form">
    <input
      type="password"
      class="input"
      placeholder="Новый пароль"
    >

    <input
      type="password"
      class="input"
      placeholder="Подтвердите пароль"
    >

    <button class="button button--type-filled button--size-l">
      Изменить
    </button>
  </div>
</template>

<script>
export default {
  name: 'PasswordChangeForm',
};
</script>
