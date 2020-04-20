<template>
  <div class="timer">
    <p class="title">{{ title }}</p>
    <p class="time">{{ formatedTime }}</p>
  </div>
</template>

<script>
export default {
  name: "timer",
  props: {
    title: {
      type: String
    },
    time: {
      type: Number
    }
  },
  computed: {
    formatedTime() {
      const hours = Math.floor(this.time / 60);
      const minutes = this.time % 60;
      if (hours >= 1) {
        return `${hours}h${minutes}`;
      }
      return `${minutes}min`;
    }
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
