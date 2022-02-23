<template>
  <transition name="fade">
    <section
      v-if="isShowed"
      class="paywall"
    >
      <div
        class="paywall__backdrop"
        title="Закрыть"
        @click="close"
      />

      <div class="paywall__inner">
        <button
          class="paywall__close-button"
          title="Закрыть"
          @click="close"
        >
          <svg-icon name="close" />
        </button>

        <h1 class="paywall__title">
          Оформление подписки
        </h1>

        <subscription-features :features="selectedSubscription.features" />

        <div class="subscription-small-wrapper">
          <div
            v-for="subscription in subscriptions"
            :key="`subscription-small-${subscription.id}`"
            :class="[
              'subscription-small-item',
              { 'subscription-small-item--selected': subscription.id === selectedSubscriptionId },
            ]"
            @click="onSubscriptionSelect(subscription.id)"
          >
            <div class="subscription-small-item__title">
              {{ subscription.title }}
            </div>

            <div class="subscription-small-item__price">
              {{ subscription.price }}
            </div>

            <div class="subscription-small-item__price-captions">
              <span v-if="subscription.priceCaption">
                {{ subscription.priceCaption }}
              </span>

              <span v-if="subscription.priceDiscount">
                {{ subscription.priceDiscount }}
              </span>
            </div>
          </div>
        </div>

        <div class="paywall__divider" />

        <button class="button button--size-xl button--type-filled">
          Оформить подписку
        </button>
      </div>
    </section>
  </transition>
</template>

<script>
import SubscriptionFeatures from '@/components/subscriptions/SubscriptionFeatures.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Paywall',

  components: { SubscriptionFeatures },

  data() {
    return {
      isShowed: false,
    };
  },

  computed: {
    ...mapState('subscriptions', ['subscriptions', 'selectedSubscriptionId']),
    ...mapGetters('subscriptions', ['getSelectedSubscription']),

    selectedSubscription() {
      return this.getSelectedSubscription;
    },
  },

  created() {
    this.$eventBus.$on('show-paywall', this.show);
  },

  destroyed() {
    this.$eventBus.$off('show-paywall', this.show);
  },

  methods: {
    ...mapActions('subscriptions', ['setSelectedSubscriptionId']),

    show() {
      this.isShowed = true;
    },

    close() {
      this.isShowed = false;
    },

    onSubscriptionSelect(id) {
      this.setSelectedSubscriptionId(id);
    },
  },
};
</script>

<style lang="scss">
.paywall {
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
    top: 0;
    right: 0;
    width: 45vw;
    height: 100%;
    background: $c-white;
    padding: 100px 5.5vw;
  }

  &__close-button {
    padding: 5px;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    outline: none;
    top: 25px;
    left: 25px;

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
    font-weight: 500;
    font-size: 36px;
    line-height: 41px;
    margin-bottom: $base-gap * 2;
  }

  &__divider {
    height: 1px;
    background: $color-border;
    width: 100%;
    margin: 30px 0;
  }

  .subscription-features {
    margin-bottom: 30px;
  }

  .button {
    width: 100%;
  }
}

.subscription-small-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $base-gap;
}

.subscription-small-item {
  border-radius: $base-border-radius;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 1px solid $color-border;
  user-select: none;
  cursor: pointer;
  transition: border-color $base-animation;
  text-align: center;

  &__title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
  }

  &__price {
    font-size: 19px;
    line-height: 22px;
    margin-bottom: 5px;
  }

  &__price-captions {
    font-size: 13px;
    line-height: 15px;

    span {
      &:first-child {
        color: $c-gray-5;
      }

      &:not(:first-child):last-child {
        color: $color-theme;
      }
    }
  }

  &--selected {
    border-color: $color-theme;
  }
}
</style>
