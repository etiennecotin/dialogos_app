<template>
  <div id="debateInformations" :class="{ open: showInformation }" ref="slider">
    <moreInformations
      :open="showInformation"
      @showInformations="showInformations"
    />
    <informations
      :debateName="debateInformations.name"
      :description="debateInformations.description"
      :debaters="debateInformations.debaters"
      @stopParentDrag="stopDrag"
    />
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
  props: {
    debateInformations: {
      type: Object
    }
  },
  data() {
    return {
      deployInformations: false,
      isActiveDraggable: false,
      draggable: null,
      appElement: null,
      dynamicClose: false
    };
  },
  computed: {
    showInformation() {
      return this.deployInformations & this.isActiveDraggable;
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.appElement = document.getElementById("app");
    },
    showInformations() {
      this.deployInformations = !this.deployInformations;
      if (!this.draggable) {
        this.initDraggable();
      }
    },
    initDraggable() {
      gsap.registerPlugin(Draggable);
      const { slider } = this.$refs;
      const maxY = slider.offsetHeight - this.appElement.offsetHeight * 0.6;
      this.draggable = Draggable.create(slider, {
        type: "y",
        edgeResistance: 0.7,
        dragResistance: 0.1,
        inertia: true,
        lockAxis: true,
        throwProps: true,
        throwResistance: 1000,
        dragClickables: false,
        allowNativeTouchScrolling: false,
        onMove: () => {
          this.checkClose();
        },
        bounds: {
          minY: 0,
          maxY: maxY
        }
      });
      this.draggable[0].disable();
      slider.removeAttribute("style");
      this.isActiveDraggable = false;
    },
    stopDrag(val) {
      if (val) {
        this.draggable[0].disable();
        this.isActiveDraggable = false;
      } else {
        this.draggable[0].enable();
        this.isActiveDraggable = true;
      }
    },
    checkClose() {
      //  Use for reduce height to scroll for close informations
      const reduceFactor = 0.70;
      const elementMaxY = this.appElement.offsetHeight * 0.6 * reduceFactor;
      const elementPosition = this.$refs.slider.getBoundingClientRect();

      if (!this.dynamicClose && elementPosition.top > elementMaxY) {
        this.dynamicClose = true;
      }
    }
  },
  watch: {
    deployInformations(val) {
      if (this.draggable) {
        if (val) {
          this.draggable[0].enable();
          this.isActiveDraggable = true;
        } else {
          this.draggable[0].disable();
          this.$refs.slider.removeAttribute("style");
          this.isActiveDraggable = false;
        }
      }
    },
    // use for close informations on drag bottom
    dynamicClose(val) {
      if (val) {
        this.draggable[0].disable();
        this.$refs.slider.removeAttribute("style");
        this.isActiveDraggable = false;
        this.dynamicClose = false;
        this.deployInformations = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#debateInformations {
  background-color: $lightBlack;
  z-index: 50;
  /*height: 100%;*/
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: 0.3s;
  transform: translate(0, calc(100% - 80px));
  &.open {
    transform: translate(0, calc(60% + 80px));
  }
}
</style>
