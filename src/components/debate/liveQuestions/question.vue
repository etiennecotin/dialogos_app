<template>
  <transition name="slide-fade" mode="out-in">
    <div class="question-item">
      <div class="profile-picture">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/dialogos-cf0e8.appspot.com/o/ayNoqBcYhgWfiA3SE85HHk66Eav1%2FprofilePictures%2Freceived_1446101385661247.jpeg?alt=media&token=980747a6-1da2-4985-bbe0-2de55366247a"
          alt="Etienne"
        />
      </div>
      <div class="question-container">
        <p class="name">{{ author }}</p>
        <p class="question">{{ question }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "question",
  props: {
    author: {
      type: String,
      default: "Question author"
    },
    question: {
      type: String,
      default: "Default question"
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.question-item {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  .profile-picture {
    width: 40px;
    display: flex;
    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 40px;
    }
  }
  .question-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: left;
    .name {
      color: $yellow;
      font-weight: bold;
    }
    .question {
      font-weight: 300;
      letter-spacing: 1px;
    }
  }
}
</style>
