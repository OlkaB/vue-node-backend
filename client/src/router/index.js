import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import(/* webpackChunkName: "logout" */ '../views/Home.vue')
    },
    {
        path: '/posts',
        name: 'posts',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
