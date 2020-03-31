<template>
  <div class="container">
    <p>dashboard</p>

    <router-link
      :to="{ name: 'debate', params: { uid: '4wA3lsgERay09PeSVd8f' } }"
      >Aller au débat</router-link
    >
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";

export default {
  name: "Home",
  mixins: [initHeaderFromRouteParams]
};
</script>
