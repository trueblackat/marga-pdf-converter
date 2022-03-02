<template>
  <div
    :class="
      [
        'document-page',
        { 'document-page--is-selectable': isSelectable },
        { 'document-page--is-selected': isSelected },
        { 'document-page--is-removable': isRemovable },
      ]"
    @click="onClick"
  >
    <div
      v-if="isSelectable"
      class="document-page__selector"
      title="Выбрать"
      @click.stop="toggleSelected"
    >
      <svg-icon name="check-small" />
    </div>

    <div class="document-page__page-number">
      {{ pageNumber }}
    </div>

    <picture class="document-page__preview">
      <img
        ref="image"
        :src="previewImage"
        :alt="previewImage"
      >
    </picture>
  </div>
</template>

<script>
export default {
  name: 'DocumentPage',

  props: {
    pageNumber: {
      type: Number,
      required: true,
    },

    previewImage: {
      type: String,
      required: true,
    },

    isSelectable: {
      type: Boolean,
      default: false,
    },

    isRemovable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isSelected: false,
    };
  },

  methods: {
    onClick() {
      if (this.isSelectable) {
        this.toggleSelected();
      }
    },

    toggleSelected() {
      this.isSelected = !this.isSelected;
      this.$emit('page-toggle-selected', this.isSelected);
    },

    remove() {
      console.log(123);
    },
  },
};
</script>

<style lang="scss">
.document-page {
  $parent: &;

  background: $c-white;
  border-radius: $base-border-radius;
  box-shadow: $base-shadow-small;
  width: 100%;
  aspect-ratio: 170 / 240;
  position: relative;
  overflow: hidden;

  &__preview {
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__selector {
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    padding: 3px;
    border: 1px solid $c-gray-6;
    background-color: $c-white;
    cursor: pointer;
    transition-property: background-color, border-color;
    transition-duration: $base-animation-time;
    transition-timing-function: $base-animation-function;
    color: $c-white;

    .svg-icon {
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity $base-animation;
    }
  }

  &__page-number {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 22px;
    background: rgba($c-black, 0.24);
    border-radius: $base-border-radius / 4;
    text-align: center;
    font-size: 13px;
    line-height: 22px;
    color: $c-white;
    user-select: none;
  }

  &--is-selectable {
    cursor: pointer;

    &:hover {
      #{$parent}__selector {
        background-color: $color-theme;
        border-color: $color-theme;
      }
    }
  }

  &--is-selected {
    #{$parent}__selector {
      background-color: $color-theme;
      border-color: $color-theme;

      .svg-icon {
        opacity: 1;
      }
    }
  }
}
</style>
