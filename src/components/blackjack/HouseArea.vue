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
    </div>
</template>

<script>
import Deck from '../Deck';
import CardInfo from '../CardInfo';
import DeckFunctions from '../../services/DeckFunctions';

export default {
  name: 'HouseArea',
  mixins: [DeckFunctions],
  components: {
  },
  props: ['name'],
  methods: {
    flipCard: function(e) {
      e.stopPropagation();
      let currentCard = e.srcElement;
      currentCard.style.transition = 'transform 1s';
      currentCard.classList.toggle('is-flipped');
    },
    resetUrls: function() {
      this.info.shuffleUrls();
      this.urls = this.info.getUrls();
      this.collectDeckCards();
    }
  },
  created() {
    this.deck = new Deck();
    this.info = new CardInfo();
    this.resetUrls();
  },
  data() {
    return {
      playing: false,
      spectating: false,
      urls: []
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
}
</style>