<template>
  <div id="menuBurger" v-click-outside="closeSideBar">
    <div class="burgerMenuIcon" @click="openSideBar">
      <BurgerMenuIcon />
    </div>
    <Navbar :is-open="isOpen" @iconClicked="closeSideBar" />
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
    },
    closeSideBar() {
      this.isOpen = false;
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function(el) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
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
