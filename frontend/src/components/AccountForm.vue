<template>
    <div class="w-10/12 mx-auto pt-3">
        <label class="block">
            <span>Nom</span>
            <input type="text" v-model="userData.lastName"
                class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-7 max-w-sm mx-auto">
        </label>
        <label class="block">
            <span>Prénom </span>
            <input type="text" v-model="userData.firstName"
                class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-7 max-w-sm mx-auto">
        </label>
        <label class="block">
            <span>Adresse mail</span>
            <input type="email" v-model="userData.mail" pattern="/([\w-\.]+@[\w\.]+\.{1}[\w]+)/"
                class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-7 max-w-sm mx-auto">
        </label>
        <label class="block">
            <span>Mot de passe</span>
            <input type="password" v-model="userData.password"
                class="block mt-1 w-full rounded-2xl border-gray-800 shadow-lg h-7 max-w-sm mx-auto">
        </label>
        <p class="italic text-xs text-left mt-2 text-center">* Tous les champs sont obligatoires</p>
    </div>
    <button @click="submitForm"
        class="mt-3 bg-indigo-600 hover:bg-indigo-700 border-gray-600 border-2 text-white font-bold py-1 px-4 rounded-full">
        M'ENREGISTRER</button>
</template>

<script>
export default {
    name: 'AccountForm',
    data() {
        return {
            userData: {
                lastName: '',
                firstName: '',
                mail: '',
                password: ''
            }

        }
    },
    emits: ["submitForm"],
    methods: {
        // emit an event to the parent component
        //the regex will check if the fields are filled correctly
        // will send to the parent the data collected in the form
        submitForm() {
            if (this.userData.lastName && // will check if there is something in the field
                this.userData.firstName &&
                this.userData.mail &&
                this.userData.password) {
                if (this.validateName(this.userData.lastName) && //will check the format with the regex
                    this.validateMail(this.userData.mail) &&
                    this.validatePassword(this.userData.password)) {
                    this.$emit('submitForm', this.userData);
                }
            } else {
                alert("Vous n'avez pas rempli tout le formulaire");
            }
        },
        validateMail(input) {
            if (/([\w-\.]+@[\w\.]+\.{1}[\w]+)/.test(input) == false) {
                alert("Votre mail ne respecte pas le format john@exemple.com");
                return false;
            } else {
                return true;
            }
        },
        validatePassword(input) {
            if (/^[a-zA-Z0-9À-ÿ\S]*$/.test(input) == false) {
                alert("Vous devez choisir un mot de passe");
                return false;
            } else {
                return true;
            }
        },
        validateName(input) {
            if (/^[a-zA-ZÀ-ÿ\-]*$/.test(input) == false) {
                alert("Vous devez renseigner votre nom");
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>
