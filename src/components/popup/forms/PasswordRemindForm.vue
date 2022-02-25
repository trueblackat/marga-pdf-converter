<template>
  <div class="popup-form">
    <p class="popup-form__caption">
      Введите Вашу почту чтобы, мы смогли вам отправить проверочный код
    </p>

    <input
      type="email"
      class="input"
      placeholder="Введите email"
      disabled
    >

    <button class="button button--type-filled button--size-l">
      Отправить
    </button>
  </div>
</template>

<script>
export default {
  name: 'PasswordRemindForm',
};
</script>
