<template>
  <div class="popup-form">
    <p class="popup-form__caption">
      Введите код подтверждения, который пришел на новую почту
    </p>

    <input
      type="text"
      class="input"
      placeholder="Введите код"
    >

    <p class="popup-form__question">
      <span>Не пришел код?</span>

      <button class="text-button text-button--inverted">
        Отправить еще раз
      </button>
    </p>

    <button class="button button--type-filled button--size-l">
      Подтвердить
    </button>
  </div>
</template>

<script>
export default {
  name: 'EmailConfirmForm',
};
</script>
