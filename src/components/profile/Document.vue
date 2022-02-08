<template>
  <div
    class="document"
    @click="openFile"
  >
    <picture class="document__preview">
      <img
        ref="image"
        :src="previewLink"
        :alt="name"
        @error="onImageLoadError"
      >
    </picture>

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
      required: true,
    },

    date: {
      type: String,
      default: '',
    },

    previewLink: {
      type: String,
      required: true,
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

  methods: {
    onImageLoadError() {
      this.$refs.image.style.display = 'none';
    },

    openFile() {
      window.open(this.link, '_blank');
    },
  },
};
</script>

<style lang="scss">
.document {
  cursor: pointer;

  &__preview {
    height: 240px;
    background: $c-white;
    box-shadow: $base-shadow-small;
    border-radius: $base-border-radius;
    margin-bottom: 15px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__name {
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    margin-bottom: 8px;
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
    display: flex;

    span {
      flex-grow: 1;

      &:not(:last-child) {
        padding-right: 5px;
      }
    }
  }
}
</style>
