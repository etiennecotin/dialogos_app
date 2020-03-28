<template>
  <div id="menuBurger">
    <div class="burgerMenuIcon" @click="openSideBar">
      <BurgerMenuIcon />
    </div>
    <Navbar :is-open="isOpen" />
  </div>
</template>

<script>
import BurgerMenuIcon from "@/components/icons/burgerMenuIcon.vue";
import Navbar from "./navbar";

export default {
  name: "burgerMenu",
  components: {
    Navbar,
    BurgerMenuIcon
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openSideBar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
#menuBurger {
  display: flex;
  .burgerMenuIcon {
    z-index: 999;
    position: absolute;
    margin: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
