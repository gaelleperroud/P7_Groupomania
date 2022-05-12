<template>
    <div class="w-11/12 border rounded-md border-gray-500 shadow-lg shadow-zinc-300 mx-auto my-6 max-w-3xl">
        <p class="font-semibold text-sm text-left capitalize ml-1 mt-1"> {{ userFirstName }} {{ userName }}</p>
        <p class="text-sm text-left mx-1 mb-2.5"> {{ content }}</p>
        <button v-if="this.currentUserId == this.userId || this.currentRole == 2" @click="deleteComment"
            class="my-0.5 bg-indigo-600 hover:bg-indigo-700 border-gray-600 border-2 text-white text-xs font-semibold py-1 px-4 rounded-full">
            SUPPRIMER
        </button>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'Comment',
    data() {
        return {
            currentUserId: sessionStorage.getItem('userId'),
            currentRole: sessionStorage.getItem('role'),
            token: sessionStorage.getItem('token')
        }
    },
    props: {
        userName: String,
        userFirstName: String,
        content: String,
        userId: Number,
        articleId: Number,
        id: Number
    },
    methods: {
        //request to delete a comment with its id 
        async deleteComment() {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            try {
                await axios.delete('http://localhost:3000/api/v1/articles/' + this.articleId + '/comments/' + this.id);
                this.$router.go()
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>