<template>
  <div id="debaterList" ref="debaterList">
    <div class="debaterListContainer" ref="debaterListContainer">
      <debater
        v-for="(debater, index) in debaters"
        :key="debater.uid + index"
        :debater="debater"
      />
    </div>
  </div>
</template>

<script>
import debater from "@/components/debate/debateInformations/debater";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import { InertiaPlugin } from "@/custom_modules/gsap-with-bonus/InertiaPlugin";

export default {
  name: "debaterList",
  components: {
    debater
  },
  props: {
    debaterList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      draggable: null
    };
  },
  mounted() {
    this.initDraggable();
  },
  computed: {
    debaters() {
      return [
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        },
        {
          lastName: "mezino",
          firstName: "alban",
          profilPicture:
            "https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/YInbOQa9hOax2MQ0jzJQgc2bCeb2%2FprofilPictures%2FvA2xk8x6_400x400.jpg?alt=media&token=f86072aa-3e2a-4790-9e80-94557a217805",
          uid: "YInbOQa9hOax2MQ0jzJQgc2bCeb2"
        }
      ];
    }
  },
  methods: {
    initDraggable() {
      gsap.registerPlugin(Draggable);
      gsap.registerPlugin(InertiaPlugin);
      const { debaterList, debaterListContainer } = this.$refs;
      this.draggable = Draggable.create(debaterListContainer, {
        type: "x",
        edgeResistance: 0.7,
        inertia: true,
        lockAxis: true,
        throwProps: true,
        throwResistance: 500,
        allowNativeTouchScrolling: false,
        bounds: debaterList,
        onDrag: () => {
          this.$emit("stopParentDrag", true);
        },
        onDragEnd: () => {
          this.$emit("stopParentDrag", false);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#debaterList {
  display: flex;
  .debaterListContainer {
    display: flex;
    flex: 1 0 auto;
    .debater:first-child {
      margin-left: 0;
    }
    .debater:last-child {
      margin-left: 0;
    }
  }
}
</style>
