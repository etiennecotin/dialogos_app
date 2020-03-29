<template>
  <div id="app">
    <AppHeader v-if="isLogged" />
    <router-view v-show="isAppReady" />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from "@/components/generic/header/index";
import { mapGetters } from "vuex";

export default {
  name: "mainApp",
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters(["isLogged", "isAppReady"])
  },
  async created() {
    try {
      const response = await this.$store.dispatch("checkUserLogged");
      await this.$store.dispatch("setAppReady");
      if (response) {
        this.$router.push({ name: "home" });
      }
    } catch (e) {
      // console.log(e);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: $sans-serif-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
