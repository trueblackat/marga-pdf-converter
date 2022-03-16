<template>
  <button
    class="the-lang-changer text-button"
    @click="changeLang(showedLang.code)"
  >
    <svg-icon name="globe" />

    <span>{{ showedLang.label }}</span>
  </button>
</template>

<script>
import { languages } from '@/translates';

export default {
  name: 'TheLangChanger',

  languages,

  computed: {
    showedLang() {
      return languages.find((item) => item.code !== this.$i18n.locale);
    },
  },

  methods: {
    changeLang(code) {
      this.$i18n.locale = code;
    },
  },
};
</script>

<style lang="scss">
.the-lang-changer {
  display: flex;
  align-items: center;

  .svg-icon {
    margin-right: 5px;
  }
}
</style>
