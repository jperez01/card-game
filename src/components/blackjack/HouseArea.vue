<template>
    <div class="player-field">
        <h3> {{this.name}} </h3>
        <div class="house-hand"> 
          <div class="card" :id="name + n" v-for="n in 3" v-on:click="flipCard" v-bind:key=n :url=urls[n] >
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${urls[n]}.svg`)' />
          </div>
          <div>
            <div class="deck-card" v-for="n in 20" v-on:click="flipCard" v-bind:key=n :url=urls[n] >
                <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
                <img class="card__face card__face--back" :src='require(`../../assets/Cards/${urls[n]}.svg`)' />
            </div>
          </div>
        </div>
        <button v-on:click="collectCards($event, 'deck-card')"> Make Deck </button>
        <button v-on:click="initiateDealCard"> Deal Card </button>
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
    handleDealCard: function() {
      // Only sends card to player if they haven't lost yet
      if (this.playersLost.indexOf(this.currentPlayer) == -1) {
        let playerCard = `P${this.currentPlayer}2`;
        let url = this.moveCardToPlayer(playerCard, this.toggled);
        this.sendCardToPlayer(`P${this.currentPlayer}`, url);
      }

      // Changes the current player to the next one in the order
      if (this.currentPlayer !== this.players) {
        this.currentPlayer += 1;
      } else {
        this.currentPlayer = 1;
        this.toggled = true;
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
    reset: function() {
      this.shuffleUrls();
      this.givenUrls = this.getUrls();
      if (this.user.localeCompare('P1') === 0) {
        setTimeout(() => {
          this.$socket.emit('store cards', this.givenUrls);
        }, 2000);
      }
      this.playersLost = [];
      this.currentPlayer = 1;
      this.toggled = false;
    },
  },
  created() {
    this.reset();
    this.$socket.on('send house cards', houseUrls => {
      this.givenUrls = houseUrls;
    });
    this.$socket.on('handle deal', () => {
      this.handleDealCard();
    });
    this.$socket.on('reset', () => {
      this.reset();
    });
    EventBus.$on('player lost', name => {
      let convertedValue = Number(name.substring(1, 2));
      this.playersLost.push(convertedValue);
    });
  },
  data() {
    return {
      givenUrls: [],
      toggled: false,
      currentPlayer: 1,
      playersLost: []
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