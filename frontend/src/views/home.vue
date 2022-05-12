<template>
  <div>
    <div class="header">
    </div>
    <Nav />
  </div>
  <div>
    <select v-model="selected" @change="sort" class="mt-4 rounded-md mx-auto">
      <option disabled value="">Trier les articles</option>
      <option>Par date (tri par defaut)</option>
      <option>Par ordre alphabétique</option>
    </select>
  </div>
  <div>
    <div :key="index" v-for="(article, index) in articles">
      <ArticleCard :userName="article.user.last_name" :userFirstName="article.user.first_name" :date="article.updatedAt"
        :title="article.title" :imageUrl="article.image_url" :id="article.id" />
    </div>
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
  name: 'home',
  components: {
    Nav, ArticleCard
  },
  data() {
    return {
      articles: "",
      page: 1,
      selected: "",
      token: sessionStorage.getItem('token')
    }
  },
  async mounted() {
    //request to get all the articles from the api sorted by date (default)
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const resArticles = await axios.get('http://localhost:3000/api/v1/articles');
      this.articles = resArticles.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    //request to get more articles 
    async getMoreArticles() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const page = this.page++;
      //if sort by alphabetical order is selected, it will return the array already sorted
      if (this.selected == "Par ordre alphabétique") {
        try {
          const sortedNextPage = await axios.get('http://localhost:3000/api/v1/articles?page=' + page + '&sort=' + this.selected);
          if (sortedNextPage.data.length == 0) {
            alert("il n'y a pas d'autres articles");
          } else {
            sortedNextPage.data.forEach((el) =>
              this.articles.push(el));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        //default sort (by date)
        try {
          const nextPage = await axios.get('http://localhost:3000/api/v1/articles?page=' + page);
          if (nextPage.data.length == 0) {
            alert("il n'y a pas d'autres articles")
          } else {
            nextPage.data.forEach((el) =>
              this.articles.push(el));
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    //request to get all the articles sorted by alphabetical order
    async sort() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      this.page = 1;
      if (this.selected == "Par ordre alphabétique") {
        const sortedArticles = await axios.get('http://localhost:3000/api/v1/articles?sort=' + this.selected);
        this.articles = sortedArticles.data;
      } else {
        this.$router.go();
      }
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #6200ee;
  background-image: url("../assets/logoWhiteMin.png");
  height: 50px;
  background-size: 200px;
  background-repeat: no-repeat;
  background-position: center;
}

@media screen and (min-width: 800px) {
  .header {
    background-position: left 20px top -75px;
  }
}
</style>