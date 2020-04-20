<template>
  <div class="timePoint" :style="absolutePosition" @click="pointer">
    <p>{{ time }}'</p>
  </div>
</template>

<script>
export default {
  name: "timePoint",
  props: {
    time: {
      type: Number
    },
    position: {
      type: Number
    }
  },
  computed: {
    absolutePosition() {
      return {
        left: `${this.position}px`
      };
    }
  },
  methods: {
    pointer() {
      // console.log(this.time);
    }
  }
};
</script>

<style lang="scss" scoped>
.timePoint {
  z-index: 30;
  background-color: $lightBlack;
  position: absolute;
  padding: 0 5px;
  color: $yellow;
  .actualPoint {
    font-weight: bold;
  }
}
</style>
