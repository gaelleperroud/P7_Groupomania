<template>
    <div class="header">
        <!--form to login-->
        <div class="w-10/12 mx-auto pt-12">
            <h1 class="mt-10 font-bold text-3xl">Connexion à Groupomania</h1>
            <label class="block mt-5">
                <span>Adresse mail</span>
                <input type="email" v-model="mail"
                    class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-7 max-w-sm mx-auto">
            </label>
            <label class="block mt-5">
                <span>Mot de passe</span>
                <input type="password" v-model="password"
                    class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-7 max-w-sm mx-auto">
            </label>
            <button @click="login"
                class="mt-5 bg-indigo-600 hover:bg-indigo-700 border-white border-2 text-white font-bold py-1 px-4 rounded-full">
                Connexion
            </button>
        </div>
    </div>
    <div class="mt-96">
        <h2 class="text-2xl font-bold mt-2 mx-auto w-10/12">Vous n'avez pas encore de compte ?</h2>
        <button @click="this.$router.push({ path: '/signup' })"
            class="mt-3 bg-indigo-600 hover:bg-indigo-700 border-white border-2 text-white font-bold py-1 px-4 rounded-full">
            Créer un compte
        </button>

    </div>
</template>

<script>
const axios = require('axios');


export default {
    name: 'login',
    data() {
        return {
            mail: '',
            password: ''
        }
    },
    mounted() {
        //clear the session storage in this page so no one can connect with somebody else's token
        sessionStorage.clear();
    },
    methods: {
        //request login, send email and password to the api and get token, userid and role
        async login() {
            try {
                const userData = await axios.post('http://localhost:3000/api/v1/auth/login', { email: this.mail, password: this.password });
                sessionStorage.setItem('token', userData.data.token);
                sessionStorage.setItem('userId', userData.data.userId);
                sessionStorage.setItem('role', userData.data.role);
                this.$router.push({ path: '/home' });
            } catch (error) {
                alert("Votre adresse mail ou mot de passe ne fonctionne pas");
            }
        },
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
    background-position: 50% -75px;
}
</style>