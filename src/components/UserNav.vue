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
      <dropdown
        v-model="isDropdownShowed"
        bounding="right"
      >
        <router-link
          class="text-button"
          to="/"
        >
          {{ $t('actions.addFile') }}
        </router-link>

        <router-link
          class="text-button"
          to="/my-files"
        >
          {{ $t('myFiles') }}
        </router-link>

        <router-link
          class="text-button"
          to="/profile"
        >
          {{ $t('profile.title') }}
        </router-link>

        <button
          class="text-button"
          @click="logout"
        >
          {{ $t('actions.out') }}
        </button>
      </dropdown>
    </transition>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue';
import { mapActions } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'UserNav',

  components: { UserAvatar, Dropdown },

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
}
</style>
