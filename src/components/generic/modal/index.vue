<template>
  <transition name="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <header>
            <linearCircleBackArrow @click.native="closeModal" class="go-back" />
            <h1>{{ debateName }}</h1>
          </header>
          <timers class="timers" />
          <h2>{{ modalTitle }}</h2>
        </div>
        <div class="modal-body">
          <slot>
            <p>Your custom body</p>
          </slot>
        </div>
        <div v-if="showFooter" class="modal-footer">
          <circleArrowLight />
          <p class="validation-text">Appuyer pour envoyer</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import linearCircleBackArrow from "@/components/icons/linearCircleBackArrow";
import circleArrowLight from "@/components/icons/circleArrowLight";
import timers from "@/components/debate/timers/index";

export default {
  name: "modal",
  components: {
    linearCircleBackArrow,
    timers,
    circleArrowLight
  },
  props: {
    modalTitle: {
      type: String,
      default: "Choose a title"
    },
    debateName: {
      type: String
    },
    showFooter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: absolute;
  background-color: $lightBlack;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .modal-container {
    height: 100%;
    padding: 20px 30px;
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    .modal-header {
      header {
        display: flex;
        align-items: center;
        .go-back {
          margin-right: 20px;
          &:hover {
            cursor: pointer;
          }
        }
        h1 {
          font-family: $serif-font;
          font-size: 18px;
          text-align: left;
        }
      }
      .timers {
        margin: 30px 0;
      }
      h2 {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        text-decoration: underline;
      }
    }
    .modal-body {
      margin: 20px 0;
    }
    .modal-default-button {
      float: right;
    }
    .modal-footer {
      margin-top: 20%;
      display: flex;
      align-items: center;
      .validation-text {
        margin-left: 20px;
      }
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter, .modal-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
