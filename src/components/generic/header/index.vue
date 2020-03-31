<template>
  <header>
    <BurgerMenu />
    <headerName />
  </header>
</template>

<script>
import BurgerMenu from "./burgerMenu";
import headerName from "./headerName";

export default {
  name: "AppHeader",
  components: {
    BurgerMenu,
    headerName
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  display: flex;
}
</style>
