<template>
  <header>
    <BurgerMenu />
    <!--    <router-link to="/">Home</router-link> |-->
    <!--    <router-link to="/about">About</router-link>-->
    <p class="pageTitle">Intelligence artificielle versus intelligence humaine ?</p>
  </header>
</template>

<script>
import BurgerMenu from "./burgerMenu";

export default {
  name: "AppHeader",
  components: {
    BurgerMenu
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  display: flex;
  .pageTitle {
    /*margin-top: 15px;*/
    font-family: $serif-font;
    font-weight: 900;
    color: $white;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
}
</style>
