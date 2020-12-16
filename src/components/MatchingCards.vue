<template>
  <div class="playing-field">
    <Loader />
    <router-link class="home" to="/">Return Home </router-link>
        <div class="header">
            <button v-on:click="resetField" class="button"> Reset </button>
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
import Loader from './Loader';
import DeckFunctions from '../services/DeckFunctions';
import CardFunctions from '../services/CardFunctions';

export default {
  name: 'MatchingCards',
  props: {
  },
  mixins: [DeckFunctions, CardFunctions],
  components: {
    Loader
  },
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
    resetField: function(e) {
      this.resetFlippedCard(this.firstFlipped);
      this.resetFlippedCard(this.secondFlipped);
      this.resetInvisibleCards();
      this.endTimer();
      this.resetField(e);
      this.shuffleUrls();
      this.resetUrls();
      this.counter = 0;
      this.firstFlipped = null;
      this.secondFlipped = null;
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
      let result = this.info.isCopy(firstUrl, secondUrl);
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
    this.oldCards = [];
    this.resetUrls();
    this.firstFlipped = null;
    this.secondFlipped = null;
  },
  data() {
    return {
      counter: 0,
      time: '0:00'
      }
  }
}
</script>

<style scoped>
.playing-field {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #45a173;
  flex-direction: column;
}

.card-deck {
  display: grid;
  align-self: center;
  grid-template-rows: repeat(4, 180px);
  grid-template-columns: repeat(8, 120px);
}

.button {
  height: 40px;
  width: 100px;
  font-family: 'Comm Bold';
  font-size: 20px;
  color: white;
  align-self: center;
  background: none;
  border: 1px solid white;
  cursor: pointer;
}

.button:hover {
  background-color: rgba(66, 65, 65, .4);
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

.home {
  height: 25px;
  text-align: center;
  position: absolute;
  font-family: 'Comm Bold';
  color: white;
  font-size: 20px;
  padding: 10px;
  margin: 20px;
  text-decoration: none;
  border: 1px solid white;
}

.home:hover {
  background-color:rgba(66, 65, 65, .4);
}
</style>
