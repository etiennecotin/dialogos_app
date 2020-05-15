<template>
  <div class="debate-item">
    <div class="debate-item-info">
      <p class="debate-date">{{ debateDate }}</p>
      <p class="debate-name">
        {{ debate.debate.name }}
      </p>
      <p class="info-link">informations</p>
    </div>
    <router-link
      class="goTo-debate"
      :to="{ name: 'debate', params: { uid: '4wA3lsgERay09PeSVd8f' } }"
    >
      <circleArrowGoTo />
    </router-link>
  </div>
</template>

<script>
import circleArrowGoTo from "@/components/icons/circleArrowGoTo";
export default {
  name: "debateItem",
  components: {
    circleArrowGoTo
  },
  props: {
    debate: {
      type: Object
    }
  },
  computed: {
    debateDate() {
      const date = this.debate.debate.date.toDate(); // date object
      const dateTimeFormat = new Intl.DateTimeFormat("fr", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      const [
        { value: day },
        ,
        { value: month },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute }
      ] = dateTimeFormat.formatToParts(date);

      return `${day} ${month} ${year} - ${hour}:${minute}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.debate-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .debate-item-info {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    padding-right: 10px;
    flex: 5;
    .debate-date {
      color: $yellow;
      font-size: 23px;
      font-family: $sans-serif-font;
      margin: 4px 0;
    }
    .debate-name {
      color: $white;
      font-family: $serif-font;
      font-size: 18px;
      text-align: left;
      margin: 4px 0;
    }
    .info-link {
      color: $yellow;
      font-size: 16px;
      text-decoration: underline;
      margin: 4px 0;
    }
  }
  .goTo-debate {
    flex: 1;
  }
}
</style>
