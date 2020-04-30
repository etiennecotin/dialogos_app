<template>
  <div class="debate-list">
    <debateItem />
    <debateItem />
  </div>
</template>

<script>
import debateItem from "@/components/generic/debateList/debateItem";
export default {
  name: "debateList",
  components: {
    debateItem
  }
};
</script>

<style lang="scss" scoped>
.debate-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
