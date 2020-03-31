<template>
  <div id="headerName" :class="{ headerDefault: header.default }">
    <p class="pageTitle" :class="{ default: header.default }">
      {{ header.name }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headerName",
  computed: {
    ...mapGetters(["header"])
  }
};
</script>

<style lang="scss" scoped>
#headerName {
  display: flex;
  width: 100%;
  &.headerDefault {
    justify-content: center;
    padding-right: 70px;
  }
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
    &.default {
      letter-spacing: 1px;
      font-size: 20px;
    }
  }
}
</style>
