<template>
    <div class="house-field">
        <h3 class="text"> {{this.name}} </h3>
        <h3 class="text"> {{this.calculatedTotal}} </h3>
        <div class="house-hand"> 
          <div class="card" :id="name + (n-1)" v-for="n in 3" v-bind:key=n :url=deckCards[n-1]>
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${deckCards[n-1]}.svg`)' />
          </div>
          <div>
            <div class="deck-card" v-for="n in 20" v-bind:key=n :url=givenUrls[n-1]>
                <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
                <img class="card__face card__face--back" :src='require(`../../assets/Cards/1B.svg`)' />
            </div>
          </div>
        </div>
        <div v-if="canChoose">
          <button class="button" v-on:click="handleStayPlayer"> Stay </button>
          <button class="button" v-on:click="initiateDealCard"> Hit </button>
        </div>
    </div>
</template>

<script>
import DeckFunctions from '../../services/DeckFunctions';
import CardFunctions from '../../services/CardFunctions';
import { EventBus } from '../../main';
import { mapState } from 'vuex';

export default {
  name: 'HouseArea',
  mixins: [DeckFunctions, CardFunctions],
  computed: {
    ...mapState({
      players (state) {
        return state.inRoomUsers
      },
      givenUrls (state) {
        return state.House.givenUrls
      },
      deckCards (state) {
        return state.House.deckCards
      }
    })
  },
  props: ['name', 'user'],
  methods: {
    initiateDealCard: function() {
      this.$socket.emit('deal card');
    },
    handleHouseTurn: function() {
      this.canChoose = false;
      this.addCardValue(this.deckCards[1]);
      let card = document.getElementById(`${this.name}1`);
      card.classList.toggle('is-flipped');
      if (this.calculatedTotal < 17) {
        this.handleDealToHouse();
      }
      this.$store.dispatch('finalizeHouseTotal', this.calculatedTotal);
    },
    handleDealToHouse: function() {
      let houseToggled = false;
      while (this.calculatedTotal < 17) {
        let houseCard = `${this.name}2`;
        let url = this.moveCardToPlayer(houseCard, houseToggled);
        houseToggled = true;
        this.addCardValue(url);
      }
    },
    handleDealCard: function() {
      // Only sends card to player if they haven't lost or stayed yet
      if (this.playersToDeal[this.currentPlayer - 1]) {
        let playerCard = `P${this.currentPlayer}2`;
        let url = this.moveCardToPlayer(playerCard, this.toggled);
        let payload = {
          player: `P${this.currentPlayer}`,
          newUrl: url
        };
        this.$store.dispatch('dealToPlayer', payload);
      }
      this.toggled = true;
    },
    handleStayPlayer: function() {
      this.$socket.emit('change turn', this.currentPlayer + 1);
      this.playersToDeal[this.currentPlayer - 1] = false;
    },
    moveToNextPlayer: function() {
      if (this.currentPlayer !== this.players) {
        this.currentPlayer += 1;
        this.enableActions();
        this.toggled = false;
      } else {
        this.alreadyHouseTurn = true;
        this.handleHouseTurn();
      }
      console.log("Moved to Player: P" + this.currentPlayer);
    },
    enableActions: function() {
      if (this.user.localeCompare(`P${this.currentPlayer}`) === 0 && this.playersToDeal[this.currentPlayer - 1]) {
        this.canChoose = true;
      } else {
        this.canChoose = false;
      }
    },
    initializeHand: function() {
      this.calculatedTotal = 0;
      this.addCardValue(this.deckCards[0]);
      let card = document.getElementById(`${this.name}0`);
      card.classList.toggle('is-flipped');
      this.enableActions();
    },
    addCardValue: function(url) {
      // Gets char value from string and converts to a number to add to the total
      let char = url.substring(0, 1);
      let value = this.getValue(char);
      this.calculatedTotal += value;
    },
    reset: function() {
      this.alreadyHouseTurn = false;
      this.playersToDeal = [true, true, true, true];
      this.currentPlayer = 1;
      this.toggled = false;
      if (this.user.localeCompare('P1') === 0) {
        this.shuffleUrls();
        let urls = this.getUrls();
        setTimeout(() => {
          this.$socket.emit('store cards', urls);
        }, 2000);
      }
    },
  },
  created() {
    this.reset();
    this.$socket.on('send house cards', (houseUrls, deckCards) => {
      this.$store.commit('setHouseGivenUrls', houseUrls);
      this.$store.commit('setHouseDeckCards', deckCards);
      setTimeout(() => {
        this.initializeHand();
      }, 500);
    });
    this.$socket.on('handle deal', () => {
      this.handleDealCard();
    });
    EventBus.$on('reset', () => {
      this.reset();
    });
    this.$socket.on('next player', (player) => {
      let result = this.user.localeCompare(`P${player}`);
      if (result === 0 || !this.alreadyHouseTurn) {
        this.moveToNextPlayer();
      }
    });
    EventBus.$on('player lost', name => {
      let convertedValue = Number(name.substring(1, 2));
      this.playersToDeal[convertedValue - 1] = false;
      this.moveToNextPlayer();
    });
  },
  data() {
    return {
      toggled: false,
      currentPlayer: 1,
      playersToDeal: [true, true, true, true],
      canChoose: false,
      alreadyHouseTurn: false,
      calculatedTotal: 0
    }
  }
}
</script>

<style>
.house-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.house-hand {
  display: grid;
  grid-template-columns: repeat(4, 120px);
}

.deck-card {
    position: absolute;
    left: 78.5%;
    height: 160px;
    transform: translate(0,0);
    transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    z-index: 3;
}

.deck-card.is-flipped {
  transform: rotateY(180deg);
  transition: transform 1s;
}
</style>