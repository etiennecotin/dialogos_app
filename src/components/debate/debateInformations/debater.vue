<template>
  <div class="debater">
    <router-link to="/profil" class="profil-link">
      <div class="profil-picture">
        <img :src="debater.profilePicture" :alt="fullName" />
      </div>
      {{ debater.firstName }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "debater",
  props: {
    debater: {
      type: Object,
      require: true
    }
  },
  computed: {
    fullName() {
      return `${this.debater.firstName} ${this.debater.lastName}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.debater {
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  .profil-link {
    text-transform: capitalize;
    color: $white;
    text-decoration: none;
    &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: underline;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
    }
  }
}
</style>
