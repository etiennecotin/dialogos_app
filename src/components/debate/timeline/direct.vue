<template>
  <div class="direct-section">
    <button class="direct-button">
      <div class="direct-point" :class="{ current: onCurrent }"></div>
      Direct
    </button>
  </div>
</template>

<script>
export default {
  name: "direct",
  props: {
    onCurrent: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.direct-section {
  display: flex;
  justify-content: center;
  .direct-button {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    outline: none;
    color: $yellow;
    .direct-point {
      width: 10px;
      height: 10px;
      background-color: $grey;
      border-radius: 10px;
      margin-right: 10px;
      transition: 0.5s;
      &.current {
        background-color: $red;
      }
    }
  }
}
</style>
