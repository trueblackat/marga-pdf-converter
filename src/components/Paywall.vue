<template>
  <transition name="fade">
    <section
      v-if="isShowed"
      class="paywall"
    >
      <div
        class="paywall__backdrop"
        :title="$t('actions.close')"
        @click="close"
      />

      <div
        v-loading="stripeLoading"
        class="paywall__inner"
      >
        <button
          class="paywall__close-button"
          :title="$t('actions.close')"
          @click="close"
        >
          <svg-icon name="close" />
        </button>

        <h1 class="paywall__title">
          {{ $t('profile.subscribe.order') }}
        </h1>

        <stepper
          v-if="currentStep && !isUserRegistered"
          v-model="currentStep"
          :steps="steps"
        />

        <template v-if="currentStep === steps[0].id">
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

          <button
            v-if="isUserRegistered"
            class="button button--size-xl button--type-filled"
            @click="submitSubscription"
          >
            {{ $t('profile.subscribe.order') }}
          </button>

          <button
            v-else
            class="button button--size-xl button--type-filled"
            @click="continueOrder"
          >
            {{ $t('profile.subscribe.continueOrder') }}
          </button>
        </template>

        <template v-if="currentStep === steps[1].id">
          <register-by-login-form
            :submit-button-label="$t('profile.subscribe.order')"
            @success="submitSubscription"
          />
        </template>

        <stripe-checkout
          ref="checkout"
          mode="subscription"
          :pk="stripeData.stripePk"
          :line-items="stripeData.items"
          :client-reference-id="stripeData.clientReferenceId"
          :customer-email="stripeData.customerEmail"
          :success-url="stripeData.successURL"
          :cancel-url="stripeData.cancelURL"
          @loading="v => stripeLoading = v"
        />
      </div>
    </section>
  </transition>
</template>

<script>
import RegisterByLoginForm from '@/components/auth/RegisterByLoginForm.vue';
import Stepper from '@/components/Stepper.vue';
import SubscriptionFeatures from '@/components/subscriptions/SubscriptionFeatures.vue';
import { stripePk } from '@/constants/payment.constants';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Paywall',

  components: {
    RegisterByLoginForm, Stepper, SubscriptionFeatures, StripeCheckout,
  },

  data() {
    return {
      isShowed: false,
      stripeLoading: false,
      steps: [
        {
          id: 'step-1',
          label: this.$t('subscriptionsData.steps.first'),
          disabled: false,
        },
        {
          id: 'step-2',
          label: this.$t('subscriptionsData.steps.second'),
          disabled: true,
        },
      ],
      currentStep: null,
    };
  },

  computed: {
    ...mapState('user', ['user']),
    ...mapState('subscriptions', ['subscriptions', 'selectedSubscriptionId']),
    ...mapGetters('subscriptions', {
      selectedSubscription: 'getSelectedSubscription',
    }),
    ...mapGetters('user', ['isUserRegistered']),

    stripeData() {
      return {
        stripePk,
        clientReferenceId: this.user.id,
        customerEmail: this.user.email,
        items: [{
          price: this.selectedSubscription.stripeId,
          quantity: 1,
        }],
        successURL: `${window.location.origin}/profile?action=payment-success&subscriptionId=${this.selectedSubscriptionId}&userId=${this.user.id}`,
        cancelURL: window.location.origin,
      };
    },
  },

  created() {
    this.$eventBus.$on('show-paywall', this.show);
    this.currentStep = this.steps[0].id;
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

    continueOrder() {
      this.steps[1].disabled = false;
      this.currentStep = this.steps[1].id;
    },

    submitSubscription() {
      this.$refs.checkout.redirectToCheckout();
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

    &.is-loading {
      position: absolute;
    }
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
