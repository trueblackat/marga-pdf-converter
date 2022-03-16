<template>
  <button
    class="the-lang-changer text-button"
    @click="toggleLocale"
  >
    <svg-icon name="globe" />

    <span>{{ locale.label }}</span>
  </button>
</template>

<script>
import { languages } from '@/translates';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TheLangChanger',

  languages,

  computed: {
    ...mapState('system', ['locale']),
  },

  methods: {
    ...mapActions('system', ['toggleLocale']),
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
