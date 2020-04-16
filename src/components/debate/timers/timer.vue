<template>
  <div class="timer">
    <p class="title">{{ title }}</p>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: "timer",
  props: {
    title: {
      type: String
    },
    time: {}
  }
};
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 10px;
  font-family: $serif-font;
  .title {
    font-size: 18px;
  }
  .time {
    color: $yellow;
    font-size: 40px;
    font-weight: 900;
  }
}
</style>
