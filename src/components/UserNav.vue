<template>
  <div
    v-click-outside="closeDropdown"
    class="user-nav"
  >
    <div
      class="user-nav__main"
      @click="toggleDropdown"
    >
      <UserAvatar :username="username" />

      <div class="user-nav__name">
        {{ username }}
      </div>

      <svg-icon name="arrow-down" />
    </div>

    <transition name="fade">
      <div
        v-if="isDropdownShowed"
        class="user-nav__dropdown"
      >
        <router-link
          class="text-button"
          to="/"
        >
          Добавить файл
        </router-link>

        <router-link
          class="text-button"
          to="/profile"
        >
          Профиль
        </router-link>

        <button
          class="text-button"
          @click="logout"
        >
          Выйти
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'UserNav',

  components: { UserAvatar },

  props: {
    username: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isDropdownShowed: false,
    };
  },

  watch: {
    $route() {
      this.closeDropdown();
    },
  },

  methods: {
    ...mapActions('auth', ['logout']),

    closeDropdown() {
      this.isDropdownShowed = false;
    },

    toggleDropdown() {
      this.isDropdownShowed = !this.isDropdownShowed;
    },
  },
};
</script>

<style lang="scss">
.user-nav {
  $parent: &;

  position: relative;
  user-select: none;

  &__main {
    display: flex;
    align-items: center;
    cursor: pointer;

    .svg-icon {
      width: 8px;
      height: 5px;
    }
  }

  &__name {
    margin-left: 10px;
    margin-right: 6px;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    border-radius: $base-border-radius;
    box-shadow: $base-shadow;
    padding: 15px 20px;
    background: $c-white;
    white-space: nowrap;

    .text-button {
      display: block;
      padding: 0;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
