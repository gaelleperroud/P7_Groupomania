<template>
  <div class="title header">
    <h1 class="text-white text-center pt-2.5 text-2xl font-bold">MON PROFIL</h1>
  </div>
  <Nav />
  <AccountForm @submitForm="modifyProfile" />
  <div class="mt-10 border border-4 border-double border-gray-600 rounded-2xl pt-2 w-11/12 mx-auto max-w-sm">
    <button @click="deleteAccount"
      class="bg-indigo-600 hover:bg-indigo-700 border-gray-600 border-2 text-white font-bold py-1 px-4 rounded-full">SUPPRIMER
      MON COMPTE</button>
    <p class="text-red-500 font-bold mt-2">ATTENTION Cette action est irréversible !!</p>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import AccountForm from '@/components/AccountForm.vue';
const axios = require('axios');

export default {
  name: 'profile',
  components: {
    Nav, AccountForm
  },
  data() {
    return {
      token: sessionStorage.getItem('token')
    }
  },
  //request to modify the user account
  methods: {
    async modifyProfile(payload) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      try {
        const userData = payload;
        const userId = sessionStorage.getItem('userId');
        await axios.put('http://localhost:3000/api/v1/auth/signup/' + userId,
          {
            last_name: userData.lastName,
            email: userData.mail,
            first_name: userData.firstName,
            password: userData.password,
          });
        alert("Votre profil a bien été modifié !! Vous devez vous reconnecter avec vos nouveaux identifiants");
        this.$router.push({ path: '/' });

      } catch (error) {
        console.log(error);
      }
    },
    //request to delete a user account
    async deleteAccount() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const userId = sessionStorage.getItem('userId');
      if (confirm("Etes-vous sur de vouloir supprimer votre compte ?")) {
        try {
          await axios.delete('http://localhost:3000/api/v1/auth/signup/' + userId);
          alert("Votre compte est définitivement supprimé !");
          this.$router.push({ path: '/' });
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
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