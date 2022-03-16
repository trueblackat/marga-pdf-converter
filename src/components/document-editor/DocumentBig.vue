<template>
  <div class="document-big">
    <picture class="document-big__preview">
      <img
        ref="image"
        :src="previewImage"
        :alt="previewImage"
      >
    </picture>

    <button
      class="document-big__close-button"
      :title="$t('actions.dontConvert')"
      @click="$emit('delete')"
    >
      <svg-icon name="close" />
    </button>

    <div class="document-big__footer">
      <span :title="fileName">{{ fileName }}</span>

      <span>{{ fileSize }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentBig',

  props: {
    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: String,
      required: true,
    },

    previewImage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.document-big {
  $parent: &;

  background: $c-white;
  border-radius: 24px;
  box-shadow: $base-shadow-small;
  width: 100%;
  aspect-ratio: 270 / 380;
  position: relative;
  overflow: hidden;

  &__close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    opacity: 0.6;
    width: 36px;
    height: 36px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

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

  &__footer {
    display: flex;
    align-items: center;
    white-space: nowrap;
    position: absolute;
    left: 25px;
    bottom: 25px;
    width: calc(100% - 50px);

    span {
      flex-shrink: 0;

      &:first-child {
        font-weight: 500;
        font-size: 15px;
        line-height: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 55px);
        padding-right: 5px;
      }

      &:last-child {
        font-size: 13px;
        line-height: 15px;
        width: 55px;
        text-align: right;
      }
    }
  }
}
</style>
