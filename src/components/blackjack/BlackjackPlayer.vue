<template>
    <div>
        <HouseArea :name='"House"' :user=names[0] :players="this.players" class="house" />
        <PlayerArea :name=names[0] class="main-player" />
        <SidePlayerArea v-if="active[0]" :name=names[1] class="left-player" />
        <SidePlayerArea v-if="active[1]" :name=names[2] class="top-player" />
        <SidePlayerArea v-if="active[2]" :name=names[3] class="right-player" />
        <button v-on:click="reset"> Collect Cards </button>
        <button v-on:click="moveToOriginalPosition"> Spread Cards </button>
    </div>
</template>

<script>
import { EventBus } from '../../main';
import HouseArea from './HouseArea';
import PlayerArea from './PlayerArea';
import SidePlayerArea from './SidePlayerArea';
import DeckFunctions from '../../services/DeckFunctions';
import { mapState } from 'vuex';

export default {
  name: 'BlackjackPlayer',
  mixins: [DeckFunctions],
  computed: {
      ...mapState({
          name: 'name',
          players: 'inRoomUsers'
      })
  },
  components: {
      PlayerArea,
      SidePlayerArea,
      HouseArea
  },
  methods: {
      setAreasActive: function() {
          let i = 1;
          for (i; i < this.players; i++) {
              this.active.push(true);
          }
          if (this.players < 4) {
              for (i; i < 4; i++) {
                  this.active.push(false);
              }
          }
      },
      setPlayerNames: function() {
        this.names[0] = this.name;
        let usedValue =  parseInt(this.name.substring(1));
        for (let i = 0; i < this.players; i++) {
            if (usedValue !== i + 1) {
                this.names.push('P' + (i + 1));
            }
        }
      },
      reset: function() {
          this.numOfTotals = 0;
          this.totals = [];
      },
      handleWin: function() {
        let winningNumber = 0;
        let index = 0;
        for (let i = 0; i < this.players + 1; i++) {
            if (this.totals[i] < 21 && this.totals[i] > winningNumber) {
                winningNumber = this.totals[i];
                index = i;
            } else if (this.totals[i] === 21) {
                this.enableWinner(`P${i}`);
                break;
            }
        }
        if (this.totals[5] <= 21 && this.totals[5] > winningNumber) {
            this.enableWinner('House');
        } else {
            this.enableWinner(`P${index}`);
        }
      },
      enableWinner: function(name) {
         this.$store.commit('setWinner', name);
      }
  },
  created() {
      this.setAreasActive();
      this.setPlayerNames();
      EventBus.$on('reset field', () => {
        this.active = [];
        this.names = [];
        this.setAreasActive();
        this.setPlayerNames();
      });
      EventBus.$on('reset player', () => {
          this.numOfTotals = 0;
          this.totals = [];
          this.resetBlackjack(null, 500, 2100);
      });
      EventBus.$on('handle win', (name, total) => {
          if (name.localeCompare('House') === 0) {
              this.totals[5] = total;
          } else {
              let index = Number(name.substring(1, 2));
              this.totals[index] = total;
          }
          this.numOfTotals++;
          if (this.numOfTotals === this.players + 1) {
            this.handleWin();
          }
      });
  },
  data() {
    return {
      names: [],
      active: [],
      totals: [],
      numOfTotals: 0
    }
  }
}
</script>

<style>
.left-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 1vw;
    top: 37.5vh;
    background-color: blue;
}

.right-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 73vw;
    top: 37.5vh;
    background-color: red;
}

.top-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 37vw;
    top: 2vh;
    background-color: yellow;
}

.main-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 37vw;
    top: 73vh;
    background-color: white;
}

.house {
    position: absolute;
    width: 40vw;
    height: 30vh;
    left: 30vw;
    top: 35vh;
    background-color: white;
}
</style>