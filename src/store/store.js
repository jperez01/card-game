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
            urls: ['3C', '3C', '3C'],
            finalUrl: '3C',
            total: 0
        },
        P2: {
            urls: ['3C', '3C', '3C'],
            finalUrl: '3C',
            total: 0
        },
        P3: {
            urls: ['3C', '3C', '3C'],
            finalUrl: '3C',
            total: 0
        },
        P4: {
            urls: ['3C', '3C', '3C'],
            finalUrl: '3C',
            total: 0
        },
        House: {
            givenUrls: ['3C', '3C', '3C'],
            deckCards: ['3C', '3C', '3C'],
            total: 0
        }
    },
    actions: {
        dealToPlayer (context, payload) {
            setTimeout(() => {
                context.commit('setPlayerFinalUrl', payload);
            }, 500);
        },
        finalizeHouseTotal (context, newTotal) {
            setTimeout(() => {
                context.commit('setHouseTotal', newTotal);
            }, 2000);
        },
        resetAllTotals (context) {
            let payload = {
                player: 'P1',
                total: 0
            }
            context.commit('setPlayerTotal', payload);
            payload = {
                player: 'P2',
                total: 0
            }
            context.commit('setPlayerTotal', payload);
            payload = {
                player: 'P3',
                total: 0
            }
            context.commit('setPlayerTotal', payload);
            payload = {
                player: 'P4',
                total: 0
            }
            context.commit('setPlayerTotal', payload);
            context.commit('setHouseTotal', 0);
        },
        joinRoom (context, roomID) {
            context.commit('setRoomID', roomID);
            window.sessionStorage.setItem('roomID', roomID);
            window.sessionStorage.setItem('name', context.getters.getName);
        },
        leaveRoom (context) {
            context.commit('setRoomID', '');
            context.commit('setName', '');
            window.sessionStorage.setItem('roomID', null);
            window.sessionStorage.setItem('name', null);
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