<template>
  <div
    :class="[
      'document',
      { 'document--is-disabled' : isDisabled },
    ]"
    @click="onDocumentClick"
  >
    <div class="document__preview">
      <slot v-if="$slots.default" />

      <picture v-else-if="previewLink">
        <img
          ref="image"
          :src="previewLink"
          :alt="name"
          @error="onImageLoadError"
        >
      </picture>

      <button
        v-if="link"
        class="document__download-button"
        title="Скачать"
        @click.stop.prevent="downloadFile"
      >
        <svg-icon name="download" />
      </button>
    </div>

    <div
      class="document__name"
      :title="name"
    >
      {{ name }}
    </div>

    <div
      v-if="date"
      class="document__date"
    >
      {{ date }}
    </div>

    <div class="document__info">
      <span>{{ size }}</span>

      <span v-if="fileExtension">{{ fileExtension }}</span>

      <span v-if="pagesCount">{{ pagesCount }} {{ pagesCountCaption }}</span>
    </div>
  </div>
</template>

<script>
import { documentFormats } from '@/constants/base.constants';
import { FILE_PROCESSING_MODES_TYPES } from '@/constants/system.constants';
import declOfNum from '@/utils/declOfNum';
import { saveAs } from 'file-saver';
import { mapState } from 'vuex';

export default {
  name: 'Document',

  props: {
    name: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: '',
    },

    date: {
      type: String,
      default: '',
    },

    previewLink: {
      type: String,
      default: '',
    },

    size: {
      type: String,
      required: true,
    },

    pagesCount: {
      type: Number,
      default: 0,
    },

    isClickable: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState('system', ['fileProcessingMode']),

    fileExtension() {
      return this.link.split('.').pop();
    },

    pagesCountCaption() {
      return declOfNum(this.pagesCount, ['страница', 'страницы', 'страниц']);
    },

    isPdf() {
      return this.fileExtension === documentFormats.pdf.label;
    },

    canConvert() {
      return !this.isPdf;
    },

    canMerge() {
      return this.isPdf;
    },

    canSplit() {
      return this.isPdf;
    },

    isDisabled() {
      return this.link
        && ((this.fileProcessingMode === FILE_PROCESSING_MODES_TYPES.split && !this.canSplit)
        || (this.fileProcessingMode === FILE_PROCESSING_MODES_TYPES.convert && !this.canConvert)
        || (this.fileProcessingMode === FILE_PROCESSING_MODES_TYPES.merge && !this.canMerge));
    },
  },

  methods: {
    onImageLoadError() {
      this.$refs.image.style.display = 'none';
    },

    onDocumentClick() {
      if (!this.isClickable) return;
      this.$emit('document-click', { canSplit: this.canSplit });
    },

    downloadFile() {
      saveAs(this.link);
    },
  },
};
</script>

<style lang="scss">
.document {
  $parent: &;

  cursor: pointer;
  transition: opacity $base-animation;

  &__preview {
    width: 100%;
    aspect-ratio: 170 / 240;
    margin-bottom: 15px;
    position: relative;

    #{$parent}__download-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
      border-radius: 50%;
      padding: 7px;
      width: 30px;
      height: 30px;
      background: $color-theme;
      color: $c-white;
      border: none;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    picture {
      background: $c-white;
      border-radius: $base-border-radius;
      box-shadow: $base-shadow-small;
      overflow: hidden;
      height: 100%;
      transition: box-shadow $base-animation;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  &__name {
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    margin-bottom: 8px;
    transition: color $base-animation;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date,
  &__info {
    font-size: 13px;
    line-height: 19px;
  }

  &__date {
    margin-bottom: 4px;
    color: $c-gray-5;
  }

  &__info {
    span {
      &:not(:last-child) {
        &:after {
          content: " • ";
        }
      }
    }
  }

  &:hover {
    #{$parent}__name {
      color: $color-theme;
    }

    #{$parent}__preview {
      picture {
        box-shadow: none;
      }
    }
  }

  &--is-disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>
