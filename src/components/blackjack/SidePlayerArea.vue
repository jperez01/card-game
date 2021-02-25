<template>
    <div class="player-field">
        <h3 class="text"> {{this.name}} </h3>
        <h3 class="text"> {{this.total}}</h3>
        <div class="card-hand"> 
          <div class="card" :id="name + (n-1)" v-for="n in 2" v-bind:key=(n-1) :url=dealtUrls[(n-1)] >
            <img class="card__face card__face--front" :src='require("../../assets/Cards/1B.svg")'  />
            <img class="card__face card__face--back" :src='require(`../../assets/Cards/${dealtUrls[n-1]}.svg`)' />
          </div>
          <div class="card" :id="name + 2" v-bind:key=2 :url=dealtUrls[2] >
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
      dealtUrls (state) {
        return state[this.name].urls
      },
      total (state) {
        return state[this.name].total
      }
    })
  },
  watch: {
    dealtUrls () {
      this.initializeHand();
    },
    finalUrl (newUrl) {
      setTimeout(() => {
        this.addCardValue(newUrl);
      }, 200);
    }
  },
  methods: {
    initializeHand: function() {
      this.addCardValue(this.dealtUrls[0]);
      this.addCardValue(this.dealtUrls[1]);
      let card1 = document.getElementById(`${this.name}0`);
      let card2 = document.getElementById(`${this.name}1`);
      card1.classList.toggle('is-flipped');
      card2.classList.toggle('is-flipped');
    },
    addCardValue: function(url) {
      // Gets char value from string and converts to a number to add to the total
      let char = url.substring(0, 1);
      let value = this.getValue(char);
      let newTotal = this.total + value;
      let payload = {
        player: this.name,
        total: newTotal
      }
      this.$store.commit('setPlayerTotal', payload);

      // Checks current total for each player to see their result
      if (this.total > 21) {
        EventBus.$emit('player lost', this.name);
        this.lost = true;
      }
    },
    reset: function() {
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
      this.$store.commit('setPlayerUrls', payload);
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
  },
  beforeDestroy() {
    this.$socket.removeListener('get cards' + this.name);
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