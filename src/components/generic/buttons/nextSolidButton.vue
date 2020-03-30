<template>
  <div class="solid-button">
    <button role="button" aria-label="next">
      <ArrowIcon />
    </button>
  </div>
</template>

<script>
import ArrowIcon from "@/components/icons/arrowIcon.vue";
export default {
  name: "nextSolidButton",
  components: {
    ArrowIcon
  }
};
</script>

<style lang="scss" scoped>
.solid-button {
  margin: 10px 0;
  button {
    outline: none;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: $yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
