<template>
  <div id="navbar" :class="{ open: isOpen }">
    <div class="top">
      <div class="profil-picture">
        <p>photo</p>
      </div>
      <hr />
      <router-link to="/" class="nav-link">
        <HomeIcon />
      </router-link>
      <div class="point"></div>
      <router-link :to="{ name: 'calendar' }" class="nav-link">
        <CalendarIcon />
      </router-link>
      <div class="point"></div>
      <router-link :to="{ name: 'search' }" class="nav-link">
        <SearchIcon />
      </router-link>
    </div>
    <div class="bottom">
      <router-link :to="{ name: 'logout' }">
        <LogoutIcon />
      </router-link>
    </div>
  </div>
</template>

<script>
import HomeIcon from "@/components/icons/homeIcon.vue";
import SearchIcon from "@/components/icons/searchIcon.vue";
import CalendarIcon from "@/components/icons/calendarIcon.vue";
import LogoutIcon from "@/components/icons/logoutIcon.vue";

export default {
  name: "navBar",
  components: {
    HomeIcon,
    SearchIcon,
    CalendarIcon,
    LogoutIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
#navbar {
  background-color: $black;
  height: 100vh;
  width: 70px;
  padding: 60px 8px 15px 8px;
  transition: transform 0.3s;
  transition-timing-function: ease-in-out;
  transform: translateX(-100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  &.open {
    transform: translateX(0%);
  }
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    .profil-picture {
      margin: 10px 0;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      border: 1px solid;
    }
    hr {
      width: 100%;
      margin: 10px 0;
    }
    .nav-link {
      margin: 15px 0;
    }
    .point {
      width: 5px;
      height: 5px;
      background-color: $white;
      border-radius: 20px;
    }
  }
}
</style>
