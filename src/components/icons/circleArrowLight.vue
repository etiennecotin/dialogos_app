<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    :style="disable ? disableStyle : null"
  >
    <path d="M24,0A24,24,0,1,1,0,24,24,24,0,0,1,24,0Z" fill="#D7BB61" />
    <g transform="translate(-36 -460)">
      <line
        x2="29"
        transform="translate(44.5 484.5)"
        fill="none"
        stroke="#292929"
        stroke-linecap="round"
        stroke-width="1"
      />
      <line
        x2="13"
        y2="13"
        transform="translate(60.5 471.5)"
        fill="none"
        stroke="#292929"
        stroke-linecap="round"
        stroke-width="1"
      />
      <line
        x1="13"
        y2="13"
        transform="translate(60.5 484.5)"
        fill="none"
        stroke="#292929"
        stroke-linecap="round"
        stroke-width="1"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "circleArrowLight",
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disableStyle() {
      return "fill-opacity: .25;";
    }
  }
};
</script>

<style scoped>
svg {
  transition: 0.3s;
}
</style>
