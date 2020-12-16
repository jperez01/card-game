<template>
    <div class="player-field">
        <h3> {{this.name}} </h3>
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

export default {
  name: 'SidePlayerArea',
  components: {
  },
  props: ['name'],
  methods: {
    flipCard: function(e) {
      e.stopPropagation();
      let currentCard = e.srcElement;
      currentCard.style.transition = 'transform 1s';
      currentCard.classList.toggle('is-flipped');
    }
  },
  created() {
    this.$socket.on('get cards ' + this.name, cards => {
      this.urls = cards;
    });
    this.$socket.on('dealt card ' + this.name, card => {
      this.finalUrl = card;
    });
  },
  data() {
    return {
      playing: false,
      spectating: false,
      urls: ['3C', '3C', '3C', '3C'],
      finalUrl: '3C'
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