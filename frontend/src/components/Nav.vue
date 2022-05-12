<template>
  <nav>
    <router-link to="/home">
      <i class="fa-solid fa-house fa-lg"></i>
    </router-link>
    <router-link to="/bookmark">
      <i class="fa-solid fa-bookmark fa-lg"></i>
    </router-link>
    <router-link to="/nouvelArticle">
      <i class="fa-solid fa-pen fa-lg"></i>
    </router-link>
    <router-link to="/profil">
      <i class="fa-solid fa-user fa-lg"></i>
    </router-link>
    <router-link to="/">
      <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  border-bottom: #000000 2px solid;
  height: 5px;
  margin-top: -20px;
}

@media screen and (min-width: 800px) {
  nav {
    max-width: 400px;
    margin-top: -65px;
    border-bottom: none;
    float: right;

  }

  .fa-solid {
    color: white;
    margin-left: 35px;
  }
}
</style>