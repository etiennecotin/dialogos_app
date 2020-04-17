<template>
  <div id="navbar" :class="{ open: isOpen }">
    <div class="top">
      <router-link
        :to="{ name: 'profil' }"
        class="nav-link profil-picture"
        @click.native="iconClicked"
      >
        <span v-if="!profilePicture">{{ alternativePicture }}</span>
        <img
          v-if="profilePicture"
          :src="profilePicture"
          :alt="userInfos.firstName"
        />
      </router-link>
      <hr />
      <router-link to="/" class="nav-link" @click.native="iconClicked">
        <HomeIcon />
      </router-link>
      <div class="point"></div>
      <router-link
        :to="{ name: 'calendar' }"
        class="nav-link"
        @click.native="iconClicked"
      >
        <CalendarIcon />
      </router-link>
      <div class="point"></div>
      <router-link
        :to="{ name: 'search' }"
        class="nav-link"
        @click.native="iconClicked"
      >
        <SearchIcon />
      </router-link>
    </div>
    <div class="bottom">
      <router-link :to="{ name: 'logout' }" @click.native="iconClicked">
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
import { mapGetters } from "vuex";

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
  },
  computed: {
    ...mapGetters(["profilePicture", "userInfos"]),
    alternativePicture() {
      if (this.userInfo) {
        return this.userInfos.email.charAt(0);
      }
      return null;
    }
  },
  methods: {
    iconClicked() {
      this.$emit("iconClicked", true);
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
    hr {
      width: 100%;
      margin: 10px 0;
    }
    .nav-link {
      margin: 15px 0;
      &.profil-picture {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $lightBlack;
        text-decoration: none;
        background-color: $white;
        span {
          font-size: 30px;
          font-weight: 900;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
        }
      }
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
