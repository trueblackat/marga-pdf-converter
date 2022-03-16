<template>
  <div class="popup-form">
    <input
      type="email"
      class="input"
      :placeholder="$t('email')"
    >

    <button class="button button--type-filled button--size-l">
      {{ $t('actions.change') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'EmailChangeForm',
};
</script>
