<template>
  <div class="title header">
    <h1 class="text-white text-center pt-2.5 text-2xl font-bold">MODIFIER UN ARTICLE</h1>
  </div>
  <Nav />
  <div class="w-10/12 mx-auto pt-3 max-w-xl">
    <label class="block">
      <span>Titre de l'article</span>
      <input type="text" v-model="title" placeholder="Ecrire votre nouveau titre ici..."
        class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-10">
    </label>
    <label class="inline-block mt-2">
      <span>Image de l'article</span>
      <input type="file" @change="fileUpload($event)" class="block mt-1 w-full rounded">
    </label>
    <label class="block mt-2">
      <span>Texte de l'article</span>
      <textarea type="textarea" v-model="content" rows="10" placeholder="Ecrire votre nouveau contenu ici..."
        class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg">
      </textarea>
    </label>
  </div>
  <button @click="modifyArticle"
    class="mt-5 bg-indigo-600 hover:bg-indigo-700 border-gray-600 border-2 text-white font-bold py-1 px-4 rounded-full">PUBLIER</button>
</template>

<script>
import Nav from '@/components/Nav.vue';
const axios = require('axios');

export default {
  name: 'modifierArticle',
  components: {
    Nav
  },
  data() {
    return {
      title: "",
      content: "",
      file: "",
      token: sessionStorage.getItem('token')
    }
  },
  methods: {
    fileUpload(event) {
      this.file = event.target.files[0];
    },
    //request to modify article
    async modifyArticle() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const articleId = window.location.pathname.split('/')[2];
      //in the case the image is modified 
      if (this.file && this.title && this.content) {
        let formData = new FormData();
        formData.append('image_url', this.file);
        formData.append('title', this.title);
        formData.append('content', this.content);
        try {
          await axios.put('http://localhost:3000/api/v1/articles/' + articleId, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert("Votre article a bien été modifié");
          this.$router.push({ path: '/home' });
        } catch (error) {
          console.log("envoi de l'article échoué")
        }
      } else if (this.title && this.content) { //in the case the image is not modified
        try {
          await axios.put('http://localhost:3000/api/v1/articles/' + articleId,
            {
              title: this.title,
              content: this.content
            });
          alert("Votre article a bien été modifié");
          this.$router.push({ path: '/home' });

        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Vous devez au moins remplir le titre et le contenu de l'article");
      }
    }
  }
}
</script>

<style scoped>
.title {
  background-color: #6200ee;
  height: 50px;
}

@media screen and (min-width: 800px) {
  .header {
    background-position: left 20px top -75px;
    background-image: url("../assets/logoWhiteMin.png");
    background-size: 200px;
    background-repeat: no-repeat;
  }
}
</style>