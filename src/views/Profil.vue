<template>
  <div>
    <p>Profil</p>
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";
export default {
  name: "Profil",
  mixins: [initHeaderFromRouteParams]
};
</script>

<style scoped></style>
