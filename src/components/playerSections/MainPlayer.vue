<template>
    <div class="player-field">
        <h3> Main Player</h3>
        <div class="card-hand"> 
          <div class="card" id="bottom" v-for="n in 3" v-on:click="flipCard" v-bind:key=n :url=urls[n] >
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${urls[n]}.svg`)' />
          </div>
        </div>
    </div>
</template>

<script>
import Deck from '../Deck';
import CardInfo from '../CardInfo';

export default {
  name: 'MainPlayer',
  components: {
  },
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
      this.urls = this.info.shuffleGivenUrls(this.urls);
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
      urls: null
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

.card-hand {
  display: grid;
  grid-template-columns: repeat(5, 120px);
}
</style>