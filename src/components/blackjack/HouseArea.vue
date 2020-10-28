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
        <button v-on:click="collectDeckCards"> Make Deck </button>
        <button v-on:click="handleDealCard"> Move Card </button>
    </div>
</template>

<script>
import DeckFunctions from '../../services/DeckFunctions';
import CardFunctions from '../../services/CardFunctions';

export default {
  name: 'HouseArea',
  mixins: [DeckFunctions, CardFunctions],
  components: {
  },
  props: ['name', 'user', 'players'],
  methods: {
    handleDealCard: function() {
      let playerCard = `P${this.currentPlayer}2`;
      let url = this.moveCardToPlayer(playerCard, this.toggled);
      this.socket.emit('send card', (url, `P${this.currentPlayer}`));
      this.toggled = true;
    },
    flipCard: function(e) {
      e.stopPropagation();
      let currentCard = e.srcElement;
      currentCard.style.transition = 'transform 1s';
      currentCard.classList.toggle('is-flipped');
    },
    resetUrls: function() {
      this.shuffleUrls();
      this.urls = this.getUrls();
      this.collectDeckCards();
    }
  },
  created() {
    this.socket = this.$socket;
    this.resetUrls();
    if (this.user.localeCompare('P1') === 0) {
      this.socket.emit('store cards', this.urls);
    }
    this.socket.on('send house cards', houseUrls => {
      this.urls = houseUrls;
    });
  },
  data() {
    return {
      urls: [],
      toggled: false,
      currentPlayer: 1
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