<template>
  <div class="bottom-button">
    <slot>
      <p>{{ content }}</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "bottomButton",
  props: {
    content: {
      type: String,
      default: "Button value"
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-button {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $yellow;
  color: $lightBlack;
}
</style>
