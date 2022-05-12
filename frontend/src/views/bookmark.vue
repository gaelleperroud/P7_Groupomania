<template>
  <div class="title header">
    <h1 class="text-white text-center pt-2.5 text-2xl font-bold">MES ARTICLES</h1>
  </div>
  <Nav />
  <div :key="index" v-for="(article, index) in articles">
    <ArticleCard :userName="article.user.last_name" :userFirstName="article.user.first_name" :date="article.updatedAt"
      :title="article.title" :imageUrl="article.image_url" :id="article.id" />
  </div>
  <div v-if="this.articles.length >= 2">
    <button @click="getMoreArticles"
      class="mt-3 bg-indigo-600 hover:bg-indigo-700 border-white border-2 text-white font-bold py-1 px-4 rounded-full">
      Afficher plus d'articles (2)</button>
  </div>
</template>


<script>
import ArticleCard from '@/components/ArticleCard.vue';
import Nav from '@/components/Nav.vue';

const axios = require('axios');

export default {
  name: 'bookmark',
  components: {
    Nav, ArticleCard
  },
  data() {
    return {
      articles: "",
      page: 1,
      userId: sessionStorage.getItem('userId'),
      token: sessionStorage.getItem('token')
    }
  },
  //request to get the articles from one user
  async mounted() {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const resArticles = await axios.get('http://localhost:3000/api/v1/articles?userId=' + this.userId);
      this.articles = resArticles.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    //request to get page x from the articles of one user
    async getMoreArticles() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const page = this.page++;
      try {
        const resNextPage = await axios.get('http://localhost:3000/api/v1/articles?userId=' + this.userId + '&page=' + page);
        if (resNextPage.data.length == 0) {
          alert("il n'y a pas d'autres articles");
        } else {
          resNextPage.data.forEach((el) =>
            this.articles.push(el));
        }
      } catch (error) {
        console.log(error);
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
