<template>
  <div id="app">
    <AppHeader v-if="isLogged" />
    <transition name="fade">
      <router-view v-show="isAppReady" />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from "@/components/generic/header/index";
import { mapGetters } from "vuex";
// import shortId from "shortid";

export default {
  name: "mainApp",
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters(["isLogged", "isAppReady"])
  },
  async created() {
      // console.log(shortId.generate());
    if (!this.isAppReady) {
      try {
        await this.$store.dispatch("checkUserLogged");
        await this.$store.dispatch("setAppReady");
        // if (response) {
        //   this.$router.push({ name: "home" });
        // }
      } catch (e) {
        // console.log(e);
      }
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  font-family: $sans-serif-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
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
