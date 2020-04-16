<template>
  <div class="timeInformations">
    <timer :title="'Temps de débat'" :time="'1h10'" />
    <timer :title="'Temps de la section'" :time="'15min'" />
  </div>
</template>

<script>
import timer from "@/components/debate/timers/timer";
export default {
  name: "timers",
  components: {
    timer
  }
};
</script>

<style lang="scss" scoped>
.timeInformations {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}
</style>
