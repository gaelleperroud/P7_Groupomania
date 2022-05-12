<template>
  <a @click="goToArticle" class="cursor-pointer">
    <div class="w-10/12 border rounded-3xl border-gray-500 shadow-xl mx-auto mt-6 max-w-md">
      <p class="font-semibold text-sm text-left capitalize ml-3 mt-2">{{ userFirstName }} {{ userName }}</p>
      <p class="italic text-xs text-left ml-3"> Publié {{ formatedDate }}</p>
      <h2 class="font-bold text-xl my-2.5 mx-1">{{ title }}</h2>
      <img :src="imageUrl" class="mx-auto">
      <div class="flex flex-row space-x-10 pl-8 h-11 pt-2.5">
        <div class="flex flex-row space-x-2">
          <i class="fa-solid fa-heart fa-lg pt-2.5"></i>
          <p class="text-lg"> {{ likeCount }}</p>
        </div>
        <div class="flex flex-row space-x-2">
          <i class="fa-solid fa-comment fa-lg pt-2.5"></i>
          <p class="text-lg"> {{ commentCount }}</p>
        </div>
      </div>
    </div>
  </a>
  <div v-if="this.url === '/bookmark' || this.currentRole == 2">
    <button @click="modifyArticle"
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-b-2xl mx-1 mb-2">MODIFIER</button>
    <button @click="deleteArticle"
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-b-2xl mx-1 mb-2">SUPPRIMER</button>
  </div>
</template>

<script>
const axios = require('axios');
import { DateTime } from "luxon";

export default {
  name: 'ArticleCard',
  data() {
    return {
      likes: null,
      comments: null,
      currentRole: sessionStorage.getItem('role'),
      url: window.location.pathname,
      token: sessionStorage.getItem('token')
    }
  },
  props: {
    userName: String,
    userFirstName: String,
    date: String,
    title: String,
    imageUrl: String,
    id: Number
  },
  computed: {
    formatedDate() {
      const today = DateTime.now();
      let dateArticle = DateTime.fromISO(this.date);
      let diff = today.diff(dateArticle, ['years', 'months', 'days']);
      if (diff.years == 0 && diff.months == 0) {
        if (diff.days <= 1) {
          return " aujourd'hui";
        } else if (diff.days <= 2) {
          return " hier.";
        } else {
          return " il y a " + Math.round(diff.days) + " jours.";
        }
      } else if (diff.years == 0) {
        return " il y a " + Math.round(diff.months) + " mois.";
      } else if (Math.round(diff.years) == 1) {
        return " il y a 1 an.";
      } else {
        return " il y a " + Math.round(diff.years) + " ans";
      }
    },

    commentCount() {
      if (this.comments) {
        return this.comments.count
      }
      return 0
    },
    likeCount() {
      if (this.likes) {
        return this.likes.count
      }
      return 0
    }
  },
  // will send request get for likes and comments on this article
  async mounted() {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const resLikes = await axios.get('http://localhost:3000/api/v1/articles/' + this.id + "/likes");
      const resComments = await axios.get('http://localhost:3000/api/v1/articles/' + this.id + "/comments");
      this.likes = resLikes.data;
      this.comments = resComments.data;
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    goToArticle() {
      this.$router.push({ name: 'Article', params: { id: this.id } })
    },
    //send a request to delete this article
    async deleteArticle() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      if (confirm("Etes-vous sur de vouloir supprimer cet article définitivement ?")) {
        try {
          await axios.delete('http://localhost:3000/api/v1/articles/' + this.id);
          this.$router.go()
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    },
    modifyArticle() {
      this.$router.push({ name: 'modifierArticle', params: { id: this.id } });

    }
  }
}

</script>

<style>
.fa-heart {
  color: crimson;
}
</style>