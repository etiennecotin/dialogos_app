<template>
  <div class="timeLineContainer" ref="timeLine">
    <div class="proxyTimeline" ref="proxyTimeline"></div>
    <div class="timeLine" ref="line">
      <hr class="line" />
      <timePoint
        v-for="(point, index) in points"
        :time="point.time"
        :key="index"
      />
    </div>
    <button @click="start">start</button>
    <p>{{ prettyTime }}</p>
  </div>
</template>

<script>
import timePoint from "@/components/debate/timeline/timePoint";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import { InertiaPlugin } from "@/custom_modules/gsap-with-bonus/InertiaPlugin";

export default {
  name: "timeline",
  components: {
    timePoint
  },
  mounted() {
    this.windowWith = window.innerWidth;
    // const widthFactor = windowWith / 85;
    // console.log(widthFactor * 15);
    // console.log(widthFactor * 25);
    // console.log(widthFactor * 30);
    // console.log(widthFactor * 15);
    this.initDrag();
  },
  data() {
    return {
      points: [{ time: 15 }, { time: 30 }, { time: 45 }],
      debateTime: 120,
      sectionsNumber: 4,
      isRunning: false,
      minutes: 0,
      secondes: 0,
      currentTime: 20,
      finalTime: 120,
      timeline: null,
      timer: null,
      windowWith: 2
    };
  },
  computed: {
    prettyTime() {
      let time = this.currentTime / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    }
  },
  methods: {
    initDrag() {
      gsap.registerPlugin(Draggable);
      gsap.registerPlugin(InertiaPlugin);
      const { timeLine, line, proxyTimeline } = this.$refs;

      const timeline = gsap.timeline({
        repeat: this.finalTime,
        repeatDelay: 1
      });
      // timeline.seek(1.5);
      timeline.to(line, {
        x: -this.windowWith,
        duration: this.finalTime
      });

      // gsap.set(line, {
      //   x: -(this.currentTime)
      // });
        timeline.progress(this.currentTime);
        // timeline.set(line,
        //     {left : -this.currentTime }
        // );
        // timeline.play();

      Draggable.create(proxyTimeline, {
        type: "x",
        edgeResistance: 0.6,
        inertia: true,
        lockAxis: true,
        throwProps: true,
        throwResistance: 1000,
        trigger: line,
        // bounds: timeLine,
        onDragStart: function() {
          timeline.pause();
        },
        onDrag: function() {
          if (this.x < 0) {
            timeline.progress(
              -(this.x / timeLine.getBoundingClientRect().width)
            );
          }
        },
        onDragEnd: function() {
          timeline.play();
        },
        onPress: function() {
          // console.log(
          //   "update",
          //   -(timeline.progress() * timeLine.getBoundingClientRect().width)
          // );

          gsap.set(this.target, {
            x: -(timeline.progress() * timeLine.getBoundingClientRect().width)
          });
          this.update();
        }
      });
    },
    start() {
      this.isRunning = true;
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.currentTime < this.finalTime) {
            this.currentTime++;
          } else {
            clearInterval(this.timer);
            this.reset();
          }
        }, 1000);
      }
    },
    stop() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      this.stop();
      this.currentTime = 0;
      this.secondes = 0;
      this.minutes = 0;
    },
    positionPlayhead(position) {
      // playhead = setInterval(function() {
      console.log(position);
      // gsap.set('.time', {
      //   x: position * this.currentTime
      // });
      // }, 30);
    }
  },
  watch: {
    currentTime(val) {
      console.log(val);
      // gsap.set(".timeLine", {
      //   x: -val
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.timeLineContainer {
  margin: 10px 0;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  .timeLine {
    display: flex;
    align-items: center;
    width: 100%;
    position: absolute;
    left: 50%;
    .line {
      width: 100%;
      position: absolute;
    }
  }
}
</style>
