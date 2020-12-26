import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        name: '',
        roomID: '',
        winner: '',
        inRoomUsers: 0,
        readyUsers: 0,
        P1: {
            urls: [],
            finalUrl: null,
            total: 0
        },
        P2: {
            urls: [],
            finalUrl: null,
            total: 0
        },
        P3: {
            urls: [],
            finalUrl: null,
            total: 0
        },
        P4: {
            urls: [],
            finalUrl: null,
            total: 0
        },
        House: {
            givenUrls: [],
            deckCards: [],
            total: 0
        }
    },
    mutations: {
        setName (state, newName) {
            state.name = newName;
        },
        setPlayerUrls (state, {player, newUrls}) {
            state[player].urls = newUrls;
        },
        setPlayerFinalUrl (state, {player, newUrl}) {
            state[player].finalUrl = newUrl;
        },
        setPlayerTotal (state, {player, total}) {
            state[player].total = total;
        },
        setHouseGivenUrls (state, givenUrls) {
            state.House.givenUrls = givenUrls;
        },
        setHouseDeckCards (state, deckCards) {
            state.House.deckCards = deckCards;
        },
        setHouseTotal (state, newTotal) {
            state.House.total = newTotal;
        },
        setRoomID (state, newID) {
            state.roomID = newID;
        },
        setReadyUsers (state, newReadyUsers) {
            state.readyUsers = newReadyUsers;
        },
        setInRoomUsers (state, newInRoomUsers) {
            state.inRoomUsers = newInRoomUsers;
        },
        setWinner (state, newWinner) {
            state.winner = newWinner;
        }
    },
    getters: {
        getName: function (state) {
            return state.name;
        },
        getPlayer: (state) => (player) => {
            return state[player];
        },
        getPlayerUrls: (state) => (player) => {
            return state[player].urls;
        },
        getPlayerTotal: (state) => (player) => {
            return state[player].total;
        },
        getRoomID: function (state) {
            return state.roomID;
        },
        getReadyUsers: function (state) {
            return state.readyUsers;
        },
        getInRoomUsers: function (state) {
            return state.inRoomUsers;
        },
        getWinner: function (state) {
            return state.winner;
        }
    }
});