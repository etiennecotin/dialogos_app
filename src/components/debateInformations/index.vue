<template>
  <div
    id="debateInformations"
    :class="{ open: showInformation }"
    ref="slider"
  >
    <moreInformations
      @showInformations="value => (deployInformations = value)"
    />
    <informations />
  </div>
</template>

<script>
import moreInformations from "@/components/debateInformations/moreInformations";
import informations from "@/components/debateInformations/informations";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";

export default {
  name: "debateInformations",
  components: {
    moreInformations,
    informations
  },
  data() {
    return {
      deployInformations: false,
      isActiveDraggable: false,
      draggable: null
    };
  },
  computed: {
    showInformation() {
      return this.deployInformations & this.isActiveDraggable;
    }
  },
  mounted: function() {
    this.initDraggable();
  },
  methods: {
    initDraggable() {
      gsap.registerPlugin(Draggable);
      const { slider } = this.$refs;
      this.draggable = Draggable.create(slider, {
        type: "y",
        edgeResistance: 0.7,
        inertia: true,
        lockAxis: true,
        throwProps: true,
        throwResistance: 1000,
        allowNativeTouchScrolling: true,
        onMove: this.updateActiveIndex,
        onThrowUpdate: this.updateActiveIndex,
        // bounds: {maxY: 650}
        bounds: { maxY: (document.getElementById("app").offsetHeight/3) - 80 },
        onPress: val => {
          return val;
        }
      });
      this.draggable[0].disable();
      this.$refs.slider.removeAttribute("style");
      this.isActiveDraggable = false;
    }
  },
  watch: {
    deployInformations(val) {
      if (val) {
        this.draggable[0].enable();
        this.isActiveDraggable = true;
      } else {
        this.draggable[0].disable();
        this.$refs.slider.removeAttribute("style");
        this.isActiveDraggable = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#debateInformations {
  background-color: $lightBlack;
  z-index: 50;
  height: 100%;
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: 0.3s;
  transform: translate(0, calc(100% - 80px));
  &.open {
    transform: translate(0, calc(15vh + 80px));
  }
}
</style>
