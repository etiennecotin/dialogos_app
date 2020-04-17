<template>
  <div class="lds-ripple">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "ripple"
};
</script>

<style scoped>
.lds-ripple {
  display: flex;
  position: relative;
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
}
.lds-ripple div {
  position: absolute;
  border: 3px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 3.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  transform-origin: center center;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -8.5s;
}
@keyframes lds-ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
</style>
