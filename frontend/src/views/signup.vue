<template>
    <div class="header">
    </div>
    <div>
        <h2 class="text-2xl font-bold mt-6 mx-auto w-10/12">Vous pouvez créer votre compte sur cette page</h2>
        <AccountForm @submitForm="signup" />
    </div>
    <div class="mt-10">
        <h2 class="text-lg font-bold mt-2 mx-auto w-10/12">Vous avez déja un compte ?</h2>
        <button @click="this.$router.push({ path: '/' })"
            class="bg-indigo-600 hover:bg-indigo-700 border-white border-2 text-white font-bold py-1 px-4 rounded-full">
            Se connecter
        </button>
    </div>
</template>

<script>
import AccountForm from '@/components/AccountForm.vue';
const axios = require('axios');

export default {
    name: 'signup',
    components: {
        AccountForm
    },
    data() {
        return {

        }
    },
    //request to create a user account
    methods: {
        async signup(payload) {
            try {
                const userData = payload;
                await axios.post('http://localhost:3000/api/v1/auth/signup',
                    {
                        last_name: userData.lastName,
                        email: userData.mail,
                        first_name: userData.firstName,
                        password: userData.password,
                        roleId: "1"
                    });
                alert("Votre profil a bien été créé !! Vous pouvez maintenant vous connecter avec vos identifiants.");
                this.$router.push({ path: '/' })
            } catch (error) {
                console.log(error);
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
    background-position: 50% -75px;
}
</style>