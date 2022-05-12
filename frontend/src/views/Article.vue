<template>
    <div>
        <i class="fa-solid fa-arrow-left-long cursor-pointer" @click="$router.go(-1)"> Retour</i>
        <img :src="article.image_url" class="m-auto">
        <h2 class="font-bold text-3xl my-2.5">{{ article.title }}</h2>
        <div class="flex flex-row justify-between h-16 bg-zinc-300 border border-b-zinc-500 border-b-2">
            <div>
                <p class="font-semibold text-lg text-left capitalize ml-4 mt-2">
                    {{ article.user.first_name }} {{ article.user.last_name }}
                </p>
                <p class="italic text-sm text-left ml-4">Publié {{ formatedDate }}</p>
            </div>
            <div class="flex flex-row justify-between mt-5 w-24 mr-4">
                <div class="flex flex-row space-x-2">
                    <i class="fa-solid fa-heart fa-lg pt-2.5 cursor-pointer" @click="likeArticle"></i>
                    <p>{{ likes.count }}</p>
                </div>
                <div class="flex flex-row space-x-2">
                    <i class="fa-solid fa-comment fa-lg pt-2.5"></i>
                    <p>{{ comments.count }}</p>
                </div>
            </div>
        </div>
        <div class="bg-zinc-300">
            <p class=" mx-4 text-justify pt-2 select-text">{{ article.content }}</p>
        </div>
    </div>
    <div>
        <div class="flex flex-col">
            <textarea type="textarea" v-model="commentContent" rows="2" placeholder="Ecrire votre commentaire ici..."
                class="w-11/12 border rounded-md border-gray-500 shadow-lg shadow-zinc-300 mx-auto mt-4 max-w-3xl">
            </textarea>
            <button @click="postComment"
                class="w-24 mx-auto my-1 bg-indigo-600 hover:bg-indigo-700 border-gray-600 border-2 text-white text-xs font-semibold py-1 px-4 rounded-full">
                PUBLIER
            </button>
        </div>
        <div :key="index" v-for="(comment, index) in comments.rows">
            <!--passing props to the child component-->
            <Comment :userName="comment.user.last_name" :userFirstName="comment.user.first_name"
                :content="comment.content" :articleId="comment.articleId" :userId="comment.userId" :id="comment.id" />
        </div>
    </div>

</template>

<script>
const axios = require('axios');
import { DateTime } from "luxon";
import Comment from '@/components/Comment.vue';

export default {
    name: 'Article',
    components: {
        Comment
    },
    data() {
        return {
            article: {
                title: "",
                content: "",
                image_url: "",
                user: {
                    last_name: "",
                    first_name: ""
                },
                updatedAt: "",
                id: "",
                userId: ""
            },
            comments: "",
            likes: "",
            commentContent: "",
            token: sessionStorage.getItem('token')
        }
    },
    computed: {
        formatedDate() {
            const today = DateTime.now();
            let dateArticle = DateTime.fromISO(this.article.updatedAt);
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
        //this fonction verify if the user already liked the article
        checkLikes() {
            const array = this.likes.rows;
            const userIdArray = [];
            const currentUserId = parseInt(sessionStorage.getItem('userId'));
            array.forEach((el) => {
                userIdArray.push(el.userId);
            });
            if (userIdArray.indexOf(currentUserId) !== -1) {
                console.log("Vous avez déja liké l'article !");
                return false
            } else {
                return currentUserId;
            }
        }
    },
    //request to get the article as an object with its id and get its likes and comments
    async mounted() {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            const articleId = window.location.pathname.split('/')[2];
            const resArticle = await axios.get('http://localhost:3000/api/v1/articles/' + articleId);
            const resLikes = await axios.get('http://localhost:3000/api/v1/articles/' + articleId + "/likes");
            const resComments = await axios.get('http://localhost:3000/api/v1/articles/' + articleId + "/comments");
            this.article = resArticle.data;
            this.likes = resLikes.data;
            this.comments = resComments.data;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        //request to post a comment, sending its content the the api
        async postComment() {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            const articleId = window.location.pathname.split('/')[2];
            if (this.commentContent) {
                try {
                    await axios.post('http://localhost:3000/api/v1/articles/' + articleId + '/comments', {
                        content: this.commentContent
                    });
                    this.$router.go()
                } catch (error) {
                    console.log(error);
                }
            } else {
                alert("Vous devez écrire quelque chose !!");
            }

        },
        //request to post a like on an article or to delete it
        async likeArticle() {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            const articleId = window.location.pathname.split('/')[2];
            //to post the like if the user didn't already like it
            if (this.checkLikes) {
                try {
                    await axios.post('http://localhost:3000/api/v1/articles/' + articleId + '/likes',
                        {
                            userId: this.checkLikes
                        }
                    );
                    this.$router.go();
                } catch (error) {
                    console.log(error);
                }
            } else {
                //to delete the like if the user already liked the article
                try {
                    await axios.delete('http://localhost:3000/api/v1/articles/' + articleId + '/likes');
                    this.$router.go();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

</script>

<style>
.fa-heart {
    color: crimson;
}
</style>