import { createRouter, createWebHistory } from "vue-router";
import StartPage from '@/components/StartPage.vue';
import Home from '@/components/Home.vue';

const routes = [
    {
        path: '/home',
        component: StartPage
    },
    {
        path: '/',
        component: Home
    },
];

export default createRouter({
    routes,
    history: createWebHistory('to-do'),
})