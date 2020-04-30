<template>
  <div class="timeline-section">
    <div class="timeLineContainer" ref="timeLine">
      <div class="proxyTimeline" ref="proxyTimeline"></div>
      <div class="timeLine" ref="line">
        <hr class="line" />
        <timePoint
          v-for="(point, index) in points"
          :time="point.time"
          :position="point.position"
          :key="index"
        />
      </div>
      <p class="actualTime">
        <span class="hours">{{ prettyMinutes }}</span
        >:<span class="seconds">{{ prettySeconds }}</span>
      </p>
    </div>
    <direct :on-current="counter.onCurrentTime" @click.native="current" />
  </div>
</template>

<script>
import timePoint from "@/components/debate/timeline/timePoint";
import direct from "@/components/debate/timeline/direct";
import { gsap, Linear } from "gsap";
import Draggable from "gsap/Draggable";

export default {
  name: "timeline",
  components: {
    timePoint,
    direct
  },
  props: {
    sections: {
      type: Array
    },
    debateDuration: {
      type: Number
    },
    startedAt: {}
  },
  mounted() {
    this.initTimeline();
    this.initDrag();
  },
  data() {
    return {
      points: [],
      sectionsNumber: 4,
      timeline: null,
      draggable: null,
      windowWith: null,
      counter: {
        isRunning: false,
        currentTime: 0,
        finalTime: 120,
        minutes: 0,
        seconds: 0,
        timer: null,
        onCurrentTime: true
      }
    };
  },
  computed: {
    prettyMinutes() {
      let time = parseInt(this.counter.currentTime / 60);
      if (time >= this.debateDuration) {
        this.$emit("debateEnded");
        return this.debateDuration;
      } else {
        return time < 0 ? 0 : time;
      }
    },
    prettySeconds() {
      let time = this.counter.currentTime / 60;
      let minutes = parseInt(time);
      if (time > this.debateDuration) {
        return 0;
      } else {
        return Math.round((time - minutes) * 60) < 0
          ? 0
          : Math.round((time - minutes) * 60);
      }
    }
  },
  methods: {
    initTimeline() {
      this.windowWith = window.innerWidth;
      this.counter.debateTime = this.debateDuration;
      const ratio = this.windowWith / this.counter.debateTime;
      this.sections = this.sortByKey(this.sections, "order");
      let timeArray = [];
      let startTime = 0;
      this.sections.forEach(item => {
        timeArray.push({
          time: startTime,
          position: startTime * ratio,
          section: item.order
        });
        startTime += item.duration;
      });
      this.points = timeArray;

      let startedDate = new Date(this.startedAt.seconds * 1000); // date object
      let actualDate = new Date(); // date object

      this.counter.currentTime = Math.trunc(
        (actualDate.getTime() - startedDate.getTime()) / 1000
      );
      this.counter.finalTime = this.debateDuration * 60;
      this.start();
    },
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        const x = a[key];
        const y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    initDrag() {
      gsap.registerPlugin(Draggable);
      const { timeLine, line, proxyTimeline } = this.$refs;

      const timeline = gsap.timeline({
        repeat: this.counter.finalTime,
        repeatDelay: 1
      });
      timeline.to(line, this.counter.finalTime, {
        x: -this.windowWith,
        ease: Linear.easeNone,
        onComplete: () => {
          timeline.kill();
        }
      });

      let progress = this.counter.currentTime / this.counter.finalTime;
      if (progress >= 1) {
        progress = 1;
      }
      timeline.progress(progress);

      const detectSection = drag => {
        const timelineWidth = timeLine.getBoundingClientRect().width;
        const timelinePosition = drag.x;

        const positionIndex =
          -(timelinePosition / timelineWidth) * timelineWidth;

        let selected;
        if (positionIndex > 0) {
          for (let i = 0; i < this.points.length; i++) {
            if (positionIndex > this.points[i].position) {
              selected = this.points[i];
            }
          }
        } else {
          selected = this.points[0];
        }
        this.$emit("selectSection", selected.section);
      };

      this.draggable = Draggable.create(proxyTimeline, {
        type: "x",
        lockAxis: true,
        edgeResistance: 1,
        throwProps: false,
        trigger: line,
        bounds: { minX: -this.windowWith + 1, maxX: this.windowWith },
        onDragStart: () => {
          timeline.pause();
          this.counter.onCurrentTime = false;
        },
        onDrag: function() {
          if (this.x < 0) {
            timeline.progress(
              -(this.x / timeLine.getBoundingClientRect().width)
            );
          }
        },
        onDragEnd: function() {
          detectSection(this);
          timeline.play();
          timeline.pause();
        },
        onPress: function() {
          gsap.set(this.target, {
            x: -(timeline.progress() * timeLine.getBoundingClientRect().width)
          });
          this.update();
        }
      });

      gsap.set(proxyTimeline, {
        x: -(progress * timeLine.getBoundingClientRect().width)
      });
      this.timeline = timeline;
    },
    current() {
      const { proxyTimeline, timeLine } = this.$refs;
      this.counter.onCurrentTime = true;
      let progress = this.counter.currentTime / this.counter.finalTime;
      gsap.set(proxyTimeline, {
        x: -(progress * timeLine.getBoundingClientRect().width)
      });
      this.$emit("selectSection", null);
      if (progress >= 1) {
        progress = 1;
        this.timeline.progress(progress);
      } else {
        this.timeline.progress(progress);
        this.timeline.play();
      }
    },
    start() {
      this.counter.isRunning = true;
      if (!this.counter.timer) {
        this.counter.timer = setInterval(() => {
          if (this.counter.currentTime < this.counter.finalTime) {
            this.counter.currentTime++;
          } else {
            clearInterval(this.counter.timer);
          }
        }, 1000);
      }
    },
    stop() {
      this.counter.isRunning = false;
      clearInterval(this.counter.timer);
      this.counter.timer = null;
    },
    reset() {
      this.stop();
      this.counter.currentTime = 0;
      this.counter.secondes = 0;
      this.counter.minutes = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline-section {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  .timeLineContainer {
    margin: 5px 0;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    .actualTime {
      z-index: 50;
      background-color: $lightBlack;
      border-radius: 56px;
      padding: 6px;
      color: $yellow;
      .hours {
        font-size: 23px;
        font-weight: bold;
      }
      .seconds {
        font-size: 15px;
      }
    }
    .timeLine {
      display: flex;
      align-items: center;
      width: 100%;
      position: absolute;
      left: 50%;
      .line {
        width: 100%;
        position: absolute;
        z-index: 20;
      }
    }
  }
}
</style>
