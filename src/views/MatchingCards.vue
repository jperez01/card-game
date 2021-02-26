<template>
  <div class="playing-field">
    <div class="game-info" v-if="loading">
      <h3 class="game-text">Loading</h3>
    </div>
        <div class="header">
            <router-link class="link" to="/">Return Home </router-link>
            <button v-on:click="resetFieldComponents" class="button"> Reset </button>
            <div class="header-info">
            <h3 class="header-label"> Moves </h3>
            <h3 class="header-item"> {{counter}} </h3>
            <h3 class="header-label"> Time </h3>
            <h3 class="header-item"> {{time}} </h3>
            </div>
            <button v-on:click="startTimer" class="button"> Start </button>
        </div>
    <div class="card-deck"> 
      <div class="card" v-for="n in 32" v-on:click="flipCard" v-bind:key=n :url=urls[n] >
        <img class="card__face card__face--front" :src='require("../assets/Cards/1B.svg")'  />
        <img class="card__face card__face--back" :src='require(`../assets/Cards/${urls[n]}.svg`)' />
      </div>
    </div>
  </div>
</template>

<script>
import DeckFunctions from '../services/DeckFunctions';
import CardFunctions from '../services/CardFunctions';

export default {
  name: 'MatchingCards',
  mixins: [DeckFunctions, CardFunctions],
  methods: {
    startTimer: function() {
      let seconds = 0;
      let minutes = 0;
      this.timer = setInterval(() => {
         if (seconds === 59) {
           minutes += 1;
           seconds = 0;
         } else {
           seconds++;
         }
         if (seconds < 10) {
           this.time = `${minutes}:0${seconds}`;
         } else {
           this.time = `${minutes}:${seconds}`;
         }
       }, 1000);
    },
    endTimer: function() {
      clearInterval(this.timer);
      this.time = '0:00';
    },
    resetUrls: function() {
      this.shuffleUrls();
      let identifiers = this.getUrls();
      this.urls = [];
      for (let i = 0; i < 21; i++) {
        this.urls.push(identifiers[i]);
        this.urls.push(identifiers[i]);
      }
      this.urls = this.shuffleGivenUrls(this.urls);
    },
    resetFieldComponents: function(e) {
      this.loading = true;
      this.resetFlippedCard(this.firstFlipped);
      this.resetFlippedCard(this.secondFlipped);
      this.resetInvisibleCards();
      this.endTimer();
      this.resetField(e, 500, 2500);
      this.shuffleUrls();
      this.resetUrls();
      this.counter = 0;
      this.firstFlipped = null;
      this.secondFlipped = null;
      setTimeout(() => {
        this.loading = false;
      }, 2600);
    },
    resetInvisibleCards: function() {
      this.oldCards.forEach(card => {
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        card.classList.toggle('is-flipped');
      });
      this.oldCards = [];
    },
    resetFlippedCard: function(card) {
      if (card !== null) {
        card.style.transition = 'transform 1s';
        card.classList.toggle('is-flipped');
      }
    },
    flipCard: function(e) {
      e.stopPropagation();
      let currentCard = e.srcElement;
      currentCard.style.transition = 'transform 1s';
      currentCard.classList.toggle('is-flipped');

      if (this.firstFlipped === null) {
        this.firstFlipped = currentCard;
      } else if (this.secondFlipped === null && this.firstFlipped !== currentCard) {
        this.secondFlipped = currentCard;
        this.counter += 1;
        this.checkForMatch();
      } else {
        this.firstFlipped = null;
      }
    },
    checkForMatch: function() {
      let firstUrl = this.firstFlipped.getAttribute('url');
      let secondUrl = this.secondFlipped.getAttribute('url');
      let result = this.isCopy(firstUrl, secondUrl);
      let oldFirst = this.firstFlipped;
      let oldSecond = this.secondFlipped;
      if (result) {
        this.oldCards.push(oldFirst);
        this.oldCards.push(oldSecond);
        this.hideMatchedCards(oldFirst, oldSecond);
        this.checkForEnd();
      } else {
        setTimeout(() => {
          oldFirst.classList.toggle('is-flipped');
          oldSecond.classList.toggle('is-flipped');
        }, 1000);
      }
      this.firstFlipped = null;
      this.secondFlipped = null;
    },
    hideMatchedCards: function(card1, card2) {
      setTimeout(() => {
        card1.style.visibility = 'hidden';
        card1.style.opacity = '0';
        card1.style.transition = 'visibility 1.5s linear, opacity 300ms ease-in-out';
        card2.style.visibility = 'hidden';
        card2.style.opacity = '0';
        card2.style.transition = 'visibility 1.5s linear, opacity 200ms ease-in-out';
      }, 700);
    },
    checkForEnd: function() {
      if (this.oldCards.length === 32) {
        this.endTimer();
      }
    }
  },
  created() {
    this.timer = null;
    this.resetUrls();
  },
  data() {
    return {
      counter: 0,
      time: '0:00',
      loading: false,
      firstFlipped: null,
      secondFlipped: null,
      oldCards: []
      }
  }
}
</script>

<style scoped>
#home {
  line-height: 40px;
}

.card-deck {
  display: grid;
  align-self: center;
  grid-template-rows: repeat(4, 11vh);
  grid-template-columns: repeat(8, 9vh);
}

@media screen and (max-width: 600px) {
  .card-deck {
    display: grid;
    align-self: center;
    grid-template-rows: repeat(7, 11vh);
    grid-template-columns: repeat(5, 9vh);
  }
}

.header {
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.header-info {
  display: flex;
  flex-direction: column;
  width: 100px;
}

.header-item {
  font-family: 'Comm Bold';
  color: white;
  margin: 0;
  text-align: center;
  font-size: 16px;
}

.header-label {
  font-family: 'Comm Bold';
  color: white;
  margin: 0;
  text-align: center;
  font-size: 20px;
}

</style>
