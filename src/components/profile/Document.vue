<template>
  <div
    class="document"
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
    </div>

    <div class="document__name">
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

      <span v-if="pagesCount">{{ pagesCount }}</span>
    </div>
  </div>
</template>

<script>
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
  },

  computed: {
    fileExtension() {
      return this.link.split('.').pop();
    },
  },

  methods: {
    onImageLoadError() {
      this.$refs.image.style.display = 'none';
    },

    onDocumentClick() {
      this.$emit('document-click', this.name);
      this.openFile();
    },

    openFile() {
      if (this.link) {
        window.open(this.link, '_blank');
      }
    },
  },
};
</script>

<style lang="scss">
.document {
  $parent: &;

  cursor: pointer;

  &__preview {
    height: 240px;
    margin-bottom: 15px;

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
}
</style>
