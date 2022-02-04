<template>
  <div
    :class="[
      'subscribe-item',
      { 'subscribe-item--is-hot': isHot }
    ]"
  >
    <div class="subscribe-item__hot-badge">
      <img
        src="@/assets/images/fire.svg"
        alt="hot"
      >
    </div>

    <h2 class="subscribe-item__title">
      {{ title }}
    </h2>

    <div class="subscribe-item__features">
      <div
        v-for="feature in features"
        :key="`feature-${feature}`"
        class="subscribe-item__feature"
      >
        <img
          src="@/assets/images/check.svg"
          alt="check"
        >

        <span>{{ feature }}</span>
      </div>
    </div>

    <div class="subscribe-item__price">
      {{ price }}
    </div>

    <div class="subscribe-item__price-captions">
      <span v-if="priceCaption">
        {{ priceCaption }}
      </span>

      <span v-if="priceDiscount">
        {{ priceDiscount }}
      </span>
    </div>

    <button
      class="button button--size-l button--type-filled"
      @click="$emit('select')"
    >
      Выбрать
    </button>
  </div>
</template>

<script>
export default {
  name: 'SubscribeItem',

  props: {
    title: {
      type: String,
      required: true,
    },

    features: {
      type: Array,
      default: () => ([]),
    },

    price: {
      type: String,
      required: true,
    },

    priceCaption: {
      type: String,
      default: '',
    },

    priceDiscount: {
      type: String,
      default: '',
    },

    isHot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.subscribe-item {
  $parent: &;

  background: $c-gray-4;
  border: 1px solid $c-gray-2;
  border-radius: $base-border-radius;
  padding: 50px 44px;
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 28px 40px 1fr 35px 32px 6px 15px 32px 58px;
  grid-template-areas:
    "title"
    "."
    "features"
    "."
    "price"
    "."
    "price-captions"
    "."
    "button";

  &__hot-badge {
    position: absolute;
    top: -19px;
    left: -14px;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: $c-white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $base-shadow;
    color: $color-theme;
    visibility: hidden;
    pointer-events: none;
    user-select: none;
  }

  &__title {
    text-align: center;
    grid-area: title;
  }

  &__features {
    grid-area: features;
  }

  &__feature {
    font-size: $base-font-size;
    line-height: 22px;
    display: flex;
    align-items: flex-start;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    img {
      opacity: 0.42;
      margin-right: 8px;
    }
  }

  &__price {
    font-size: 28px;
    line-height: 32px;
    text-align: center;
    grid-area: price;
  }

  &__price-captions {
    text-align: center;
    font-size: 13px;
    line-height: 15px;
    grid-area: price-captions;

    span {
      &:first-child {
        color: $c-gray-5;
      }

      &:not(:first-child):last-child {
        color: $color-theme;
      }
    }
  }

  &--is-hot {
    border-color: $color-theme;

    #{$parent}__hot-badge {
      visibility: visible;
    }

    #{$parent}__feature {
      img {
        opacity: 1;
      }
    }
  }

  .button {
    width: 100%;
    grid-area: button;
  }
}
</style>
