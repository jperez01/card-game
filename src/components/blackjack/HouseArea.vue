<template>
    <div class="player-field">
        <h3> {{this.name}} </h3>
        <h3> {{this.total}} </h3>
        <div class="house-hand"> 
          <div class="card" :id="name + (n-1)" v-for="n in 3" v-on:click="flipCard" v-bind:key=n :url=dealtUrls[n-1]>
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${dealtUrls[n-1]}.svg`)' />
          </div>
          <div>
            <div class="deck-card" v-for="n in 20" v-on:click="flipCard" v-bind:key=n :url=givenUrls[n-1]>
                <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
                <img class="card__face card__face--back" :src='require(`../../assets/Cards/1B.svg`)' />
            </div>
          </div>
        </div>
        <div v-if="canChoose">
          <button v-on:click="handleStayPlayer"> Stay </button>
          <button v-on:click="initiateDealCard"> Hit </button>
        </div>
    </div>
</template>

<script>
import DeckFunctions from '../../services/DeckFunctions';
import CardFunctions from '../../services/CardFunctions';
import { EventBus } from '../../main';

export default {
  name: 'HouseArea',
  mixins: [DeckFunctions, CardFunctions],
  components: {
  },
  props: ['name', 'user', 'players'],
  methods: {
    initiateDealCard: function() {
      this.$socket.emit('deal card');
    },
    handleHouseTurn: function() {
      this.canChoose = false;
      this.addCardValue(this.dealtUrls[1]);
      let card = document.getElementById(`${this.name}1`);
      card.classList.toggle('is-flipped');
      if (this.total < 17) {
        this.handleDealToHouse();
      }
      EventBus.$emit('send total');
      EventBus.$emit('handle win', this.name, this.total);
    },
    handleDealToHouse: function() {
      let houseToggled = false;
      while (this.total < 17) {
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
        this.sendCardToPlayer(`P${this.currentPlayer}`, url);
      }
      this.toggled = true;
    },
    handleStayPlayer: function() {
      this.$socket.emit('change turn', this.currentPlayer + 1);
      this.playersToDeal[this.currentPlayer - 1] = false;
      this.moveToNextPlayer();
    },
    moveToNextPlayer: function() {
      if (this.currentPlayer !== this.players) {
        this.currentPlayer += 1;
        this.enableActions();
        this.toggled = false;
      } else {
        this.handleHouseTurn();
      }
    },
    enableActions: function() {
      if (this.user.localeCompare(`P${this.currentPlayer}`) === 0 && this.playersToDeal[this.currentPlayer - 1]) {
        this.canChoose = true;
      } else {
        this.canChoose = false;
      }
    },
    sendCardToPlayer: function(player, url) {
      setTimeout(() => {
          EventBus.$emit(`dealt card ${player}`, url);
      }, 800);
    },
    flipCard: function(e) {
      e.stopPropagation();
      let currentCard = e.srcElement;
      currentCard.style.transition = 'transform 1s';
      currentCard.classList.toggle('is-flipped');
    },
    initializeHand: function() {
      this.addCardValue(this.dealtUrls[0]);
      let card = document.getElementById(`${this.name}0`);
      card.classList.toggle('is-flipped');
      this.enableActions();
    },
    addCardValue: function(url) {
      // Gets char value from string and converts to a number to add to the total
      let char = url.substring(0, 1);
      let value = this.getValue(char);
      this.total += value;
    },
    reset: function() {
      this.playersToDeal = [true, true, true, true];
      this.currentPlayer = 1;
      this.toggled = false;
      this.total = 0;
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
    this.$socket.on('send house cards', (houseUrls, dealtCards) => {
      this.givenUrls = houseUrls;
      this.dealtUrls = dealtCards;
      setTimeout(() => {
        this.initializeHand();
      }, 500);
    });
    this.$socket.on('handle deal', () => {
      this.handleDealCard();
    });
    this.$socket.on('reset', () => {
      this.reset();
    });
    this.$socket.on('next player', (player) => {
      if (this.user.localeCompare(`P${player}`) === 0) {
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
      givenUrls: ['3C'],
      dealtUrls: ['1B', '1B', '1B'],
      toggled: false,
      currentPlayer: 1,
      playersToDeal: [true, true, true, true],
      canChoose: false,
      total: 0
    }
  }
}
</script>

<style>
.player-field {
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