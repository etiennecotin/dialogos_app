<template>
  <div>
    <p>search</p>
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";
export default {
  name: "Search",
  mixins: [initHeaderFromRouteParams]
};
</script>

<style scoped></style>
