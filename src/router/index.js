import Vue from 'vue';
import VueRouter from 'vue-router';
import MatchingCards from '../views/MatchingCards.vue';
import Home from '../views/Home.vue';
import Blackjack from '../views/Blackjack.vue';
import Test from '../views/Test.vue';

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
        path: '/test',
        name: 'Test',
        component: Test
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