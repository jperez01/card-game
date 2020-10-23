import Vue from 'vue';
import VueRouter from 'vue-router';
import MatchingCards from '../components/MatchingCards.vue';
import Home from '../views/Home.vue';
import Blackjack from '../views/Blackjack.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/matching',
        name: 'Matching Cards',
        component: MatchingCards
    },
    {
        path: '/blackjack',
        name: 'Blackjack',
        component: Blackjack
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;