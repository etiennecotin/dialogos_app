<template>
  <div class="debate-list">
    <debateItem
      v-for="(debate, index) in debatesList"
      :key="index"
      :debate="debate"
    />
<!--    <debateItem />-->
  </div>
</template>

<script>
import debateItem from "@/components/generic/debateList/debateItem";
export default {
  name: "debateList",
  components: {
    debateItem
  },
  props: {
    debatesList: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.debate-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
