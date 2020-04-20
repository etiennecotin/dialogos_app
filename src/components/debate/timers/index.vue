<template>
  <div class="timeInformations">
    <timer :title="'Temps de débat'" :time="debate.debateInformations.duration" />
    <timer :title="'Temps de la section'" :time="actualSection.duration" />
  </div>
</template>

<script>
import timer from "@/components/debate/timers/timer";
import { mapGetters } from "vuex";
export default {
  name: "timers",
  components: {
    timer
  },
  computed: {
    ...mapGetters(["debate", "actualSection"])
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
