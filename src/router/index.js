import { createRouter, createWebHistory } from "vue-router";
import StartPage from '@/components/StartPage.vue';
import Home from '@/components/Home.vue';

const routes = [
    {
        path: '/',
        component: StartPage
    },
    {
        path: '/home',
        component: Home
    },
];

export default createRouter({
    routes,
    history: createWebHistory(),
})