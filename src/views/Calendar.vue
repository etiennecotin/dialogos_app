<template>
  <div>
    <p>calendar</p>
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";
export default {
  name: "Calendar",
  mixins: [initHeaderFromRouteParams]
};
</script>

<style scoped></style>
