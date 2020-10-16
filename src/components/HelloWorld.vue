<template>
  <div class="playing-field" v-on:click="moveCard">
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
import Deck from './Deck';
import CardInfo from './CardInfo';

export default {
  name: 'HelloWorld',
  props: {
  },
  components: {
    Loader
  },
  methods: {
    moveCard: function(e) {
      this.deck.moveCard(e);
    },
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
      this.info.shuffleUrls();
      let identifiers = this.info.getUrls();
      this.urls = [];
      for (let i = 0; i < 21; i++) {
        this.urls.push(identifiers[i]);
        this.urls.push(identifiers[i]);
      }
      this.urls = this.info.shuffleGivenUrls(this.urls);
    },
    resetField: function(e) {
      this.resetFlippedCard(this.firstFlipped);
      this.resetFlippedCard(this.secondFlipped);
      this.resetInvisibleCards();
      this.endTimer();
      this.deck.resetField(e);
      this.info.shuffleUrls();
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
        setTimeout(() => {
          oldFirst.style.visibility = 'hidden';
          oldFirst.style.opacity = '0';
          oldFirst.style.transition = 'visibility 1.5s linear, opacity 300ms ease-in-out';
          oldSecond.style.visibility = 'hidden';
          oldSecond.style.opacity = '0';
          oldSecond.style.transition = 'visibility 1.5s linear, opacity 200ms ease-in-out';
        }, 700);
      } else {
        setTimeout(() => {
          oldFirst.classList.toggle('is-flipped');
          oldSecond.classList.toggle('is-flipped');
        }, 1000);
      }
      this.firstFlipped = null;
      this.secondFlipped = null;
    }
  },
  created() {
    this.deck = new Deck();
    this.info = new CardInfo();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playing-field {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #45a173;
  flex-direction: column;
}

.card {
  height: 160px;
  transform: translate(0,0);
  transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
}

.card.is-flipped {
  transform: rotateY(180deg);
  transition: transform 1s;
}

.card__face {
  position: absolute;
  pointer-events: none;
  backface-visibility: hidden;
  box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.card__face--front {
  height: 160px;
}

.card__face--back {
  height: 160px;
  transform: rotateY(180deg);
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
}

.header-item {
  color: white;
  margin: 0;
  text-align: center;
  font-size: 16px;
}
.header-label {
  color: white;
  margin: 0;
  text-align: center;
  font-size: 20px;
}

.home {
  position: absolute;
}
</style>
