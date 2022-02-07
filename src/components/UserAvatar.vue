<template>
  <div class="user-avatar">
    <svg viewBox="0 0 34 34">
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ usernameLetter }}
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    username: {
      type: String,
      required: true,
    },
  },

  computed: {
    usernameLetter() {
      return this.username[0].toUpperCase();
    },
  },
};
</script>

<style lang="scss">
.user-avatar {
  width: 34px;
  height: 34px;
  border: 1px solid $color-border;
  border-radius: 50%;
  background: $c-gray-4;
  overflow: hidden;
  color: $c-gray-5;
  user-select: none;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    font-size: 17px;
  }
}
</style>
