<template>
  <div id="buttonInformations" @click="showInformations">
    <p>Informations du débat</p>
    <div class="simpleArrow" :class="{ rotate: rotateArrow }">
      <simpleArrow />
    </div>
  </div>
</template>

<script>
import simpleArrow from "@/components/icons/simpleArrow";

export default {
  name: "moreInformations",
  components: {
    simpleArrow
  },
  props: {
    open: {
      default: false
    }
  },
  computed: {
    rotateArrow() {
      return this.isOpen && this.open;
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    showInformations() {
      this.isOpen = !this.isOpen;
      this.$emit("showInformations", this.isOpen);
    }
  },
  watch: {
    open(val) {
      this.isOpen = val;
    }
  }
};
</script>

<style lang="scss" scoped>
#buttonInformations {
  height: 80px;
  background-color: $yellow;
  display: flex;
  align-items: center;
  color: $lightBlack;
  font-weight: 500;
  padding: 5px 40px;
  justify-content: space-evenly;
  &:hover {
    cursor: pointer;
  }
  .simpleArrow {
    transition: 0.3s;
    &.rotate {
      transform-origin: center center;
      transform: rotate(180deg);
    }
  }
}
</style>
