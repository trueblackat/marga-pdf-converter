<template>
  <svg
    v-show="isIconFound"
    :class="svgClass"
  >
    <use :xlink:href="svgPath" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    /**
     * Название иконки = имя файла без расширения (my-icon.svg -> my-icon)
     */
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Проверка на существование иконки с переданным именем
     * в глобальном объекте иконок $svgIcons (спрайт)
     * @see /src/main.js
     * @return {boolean}
     */
    isIconFound() {
      return !!this.$svgIcons[this.name];
    },
    /**
     * Путь до иконки из спрайта
     * @return {string|boolean}
     */
    svgPath() {
      return this.$svgIcons[this.name]?.url || false;
    },
    /**
     * Класс элемента svg
     * @return {string}
     */
    svgClass() {
      return `svg-icon svg-icon-${this.name}`;
    },
  },
};
</script>

<style lang="scss">
.svg-icon {
  height: 24px;
  width: 24px;
  overflow: hidden;
  display: block;
}
</style>
