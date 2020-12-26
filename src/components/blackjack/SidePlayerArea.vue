<template>
    <div class="player-field">
        <h3> {{this.name}} </h3>
        <h3> {{this.total}}</h3>
        <div class="card-hand"> 
          <div class="card" :id="name + (n-1)" v-for="n in 2" v-on:click="flipCard" v-bind:key=(n-1) :url=urls[(n-1)] >
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${urls[n-1]}.svg`)' />
          </div>
          <div class="card" :id="name + 2" v-on:click="flipCard" v-bind:key=2 :url=urls[2] >
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${finalUrl}.svg`)' />
          </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../../main';
import CardFunctions from '../../services/CardFunctions';
import { mapState } from 'vuex';

export default {
  name: 'SidePlayerArea',
  mixins: [CardFunctions],
  props: ['name'],
  computed:{
    ...mapState({
      finalUrl (state) {
        return state[this.name].finalUrl
      },
      urls (state) {
        return state[this.name].urls
      },
      total (state) {
        return state[this.name].total
      }
    })
  },
  watch: {
    urls () {
      this.initializeHand();
    },
    finalUrl (newUrl, oldUrl) {
      this.addCardValue(newUrl);
    }
  },
  methods: {
    flipCard: function(e) {
      e.stopPropagation();
      let currentCard = e.srcElement;
      currentCard.style.transition = 'transform 1s';
      currentCard.classList.toggle('is-flipped');
    },
    initializeHand: function() {
      this.total = 0;
      this.addCardValue(this.urls[0]);
      this.addCardValue(this.urls[1]);
      let card1 = document.getElementById(`${this.name}0`);
      let card2 = document.getElementById(`${this.name}1`);
      card1.classList.toggle('is-flipped');
      card2.classList.toggle('is-flipped');
    },
    addCardValue: function(url) {
      // Gets char value from string and converts to a number to add to the total
      let char = url.substring(0, 1);
      let value = this.getValue(char);
      this.total += value;

      // Checks current total for each player to see their result
      if (this.total > 21) {
        EventBus.$emit('player lost', this.name);
        this.lost = true;
      }
    },
    reset: function() {
      this.total = 0;
    }
  },
  created() {
    EventBus.$on('reset player', () => {
      this.reset();
    });
    this.$socket.on('get cards ' + this.name, cards => {
      let payload = {
        player: this.name,
        newUrls: cards
      }
      this.$socket.commit('setPlayerUrls', payload);
    });
    EventBus.$on('send total', () => {
      EventBus.$emit('handle win', this.name, this.total);
    });
  },
  data() {
    return {
      playing: false,
      spectating: false
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
  grid-template-columns: repeat(3, 120px);
}

#top {
  transform: translate(100px, 100px);
}
</style>