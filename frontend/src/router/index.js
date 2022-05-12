import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'

//config routes with their path, their names and import them
const routes = [
  {
    path:'/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component:() => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path:'/profil',
    name: 'profil',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile.vue')
  }, 
  {
    path:'/bookmark',
    name: 'bookmark',
    component: () => import(/* webpackChunkName: "bookmark" */ '../views/bookmark.vue')
  },
  {
    path:'/nouvelArticle',
    name:'nouvelArticle',
    component: () => import(/* webpackChunkName: "write" */ '../views/newArticle.vue')

  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/signup.vue')
  },
  {
    path: '/modifierArticle/:id',
    name:'modifierArticle',
    component: () => import(/* webpackChunkName: "modifierArticle" */ '../views/modifyArticle.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
