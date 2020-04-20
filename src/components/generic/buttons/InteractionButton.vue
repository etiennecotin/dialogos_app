<template>
  <button class="interactButton" :disabled="disabled">
    {{ btnContent }}
  </button>
</template>

<script>
export default {
  name: "InteractionButton",
  props: {
    btnContent: {
      type: String,
      default: "Your text here"
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.interactButton {
  padding: 5px 10px;
  // border: 1px solid $yellow;
  background-color: $yellow;
  border-radius: 50px;
  width: 33.33%;
  margin: 10px;
  color: $lightBlack;
  border: none;
  outline: none;
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
