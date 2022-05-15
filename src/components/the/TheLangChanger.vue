<template>
  <div
    v-click-outside="closeLocaleDropdown"
    class="the-lang-changer"
  >
    <button
      class="text-button"
      @click="toggleLocaleDropdown"
    >
      <svg-icon name="globe" />

      <span>{{ locale.label }}</span>
    </button>

    <dropdown v-model="isLocaleDropdownShowed">
      <button
        v-for="lang in $options.languages"
        :key="lang.code"
        class="text-button"
        @click="setLocale(lang.code)"
      >
        {{ lang.label }}
      </button>
    </dropdown>
  </div>
</template>

<script>
import { languages } from '@/translates';
import { mapActions, mapState } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'TheLangChanger',

  languages,

  components: { Dropdown },

  data() {
    return {
      isLocaleDropdownShowed: false,
    };
  },

  computed: {
    ...mapState('system', ['locale']),
  },

  watch: {
    $route() {
      this.closeLocaleDropdown();
    },
  },

  methods: {
    ...mapActions('system', ['setLocale']),

    closeLocaleDropdown() {
      this.isLocaleDropdownShowed = false;
    },

    toggleLocaleDropdown() {
      this.isLocaleDropdownShowed = !this.isLocaleDropdownShowed;
    },
  },
};
</script>

<style lang="scss">
.the-lang-changer {
  position: relative;

  .text-button {
    display: flex;
    align-items: center;

    .svg-icon {
      margin-right: 5px;
    }
  }
}
</style>
