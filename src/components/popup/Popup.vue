<template>
  <transition name="fade">
    <section
      v-if="isShowed"
      class="popup"
    >
      <div
        class="popup__backdrop"
        title="Закрыть"
        @click="close"
      />

      <div class="popup__inner">
        <button
          class="popup__close-button"
          title="Закрыть"
          @click="close"
        >
          <svg-icon name="close" />
        </button>

        <h1 class="popup__title">
          {{ title }}
        </h1>

        <slot />
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'Popup',

  props: {
    title: {
      type: String,
      default: 'Попап',
    },
  },

  data() {
    return {
      isShowed: false,
    };
  },

  methods: {
    show() {
      this.isShowed = true;
    },

    close() {
      this.isShowed = false;
    },
  },
};
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($c-black, 0.5);
    cursor: pointer;
  }

  &__inner {
    position: absolute;
    top: 40vh;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 370px;
    background: $c-white;
    padding: 40px;
    background: $color-background;
    border: 1px solid $color-border;
    border-radius: $base-border-radius;
  }

  &__close-button {
    padding: 5px;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    outline: none;
    top: 5px;
    right: 5px;

    .svg-icon {
      color: $color-border;
      transition: color $base-animation;
    }

    &:hover {
      .svg-icon {
        color: $color-text;
      }
    }
  }

  &__title {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 30px;
  }
}
</style>
