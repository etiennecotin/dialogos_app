<template>
  <button class="classic-button" :disabled="disabled" :class="{linear: linear}">
    {{ content }}
  </button>
</template>

<script>
export default {
  name: "classicButton",
  props: {
    content: {
      type: String,
      default: "Your text here"
    },
    linear: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.classic-button {
  padding: 10px 10px;
  // border: 1px solid $yellow;
  background-color: $yellow;
  border-radius: 50px;
  margin: 10px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: $lightBlack;
  border: none;
  outline: none;
  &.linear {
    border: 1px solid $yellow;
    background-color: transparent;
    color: $yellow;
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: $disabledYellow;
    &:hover {
      cursor: default;
    }
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
