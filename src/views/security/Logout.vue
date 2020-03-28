<template>
  <div>
    <p>logout</p>
  </div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    try {
      this.$store.dispatch("signOutAction");
      this.$router.push({ name: "login" });
    } catch (e) {
      console.log("Fail logout");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped></style>
