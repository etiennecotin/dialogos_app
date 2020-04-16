<template>
  <div>
    <p>Profil</p>
    <input
      type="file"
      accept="image/*"
      @change="fileSelected"
      enctype="multipart/form-data"
      id="file-input"
    />
    <img
      v-if="imagePreviewUrl"
      :src="imagePreviewUrl"
      :alt="selectedFile.name"
    />
    <button @click="uploadImage" :disabled="!selectedFile">
      Mettre à jour la photo
    </button>
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";
export default {
  name: "Profil",
  mixins: [initHeaderFromRouteParams],
  data() {
    return {
      selectedFile: null,
      imagePreviewUrl: null
    };
  },
  methods: {
    fileSelected(evt) {
      evt.preventDefault();
      // console.log(evt);
      this.selectedFile = evt.target.files[0];
      // console.log(this.selectedFile);
      this.imagePreviewUrl = URL.createObjectURL(this.selectedFile);
    },
    uploadImage() {
      this.$store.dispatch("changeUserProfilPicture", this.selectedFile);
    }
  }
};
</script>

<style scoped></style>
