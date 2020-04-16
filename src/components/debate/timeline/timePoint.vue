<template>
  <div>
    <p>{{ time }}'</p>
  </div>
</template>

<script>
export default {
  name: "timePoint",
  props: {
    time: {
      type: Number
    }
  }
};
</script>

<style scoped></style>
