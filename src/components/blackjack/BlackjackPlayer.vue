<template>
    <div>
        <HouseArea :name='"House"' :user=names[0] :players="this.players" class="house" />
        <PlayerArea :name=names[0] class="main-player" />
        <SidePlayerArea v-if="active[0]" :name=names[1] class="left-player" />
        <SidePlayerArea v-if="active[1]" :name=names[2] class="top-player" />
        <SidePlayerArea v-if="active[2]" :name=names[3] class="right-player" />
    </div>
</template>

<script>
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
          name (state) {
              return state.name;
          },
          players (state) {
              return state.inRoomUsers
          },
          total (state) {
              return state.House.total
          }
      })
  },
  watch: {
      total (newValue) {
          if (newValue !== 0) {
              this.handleWin();
          }
      }
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
      handleWin: function() {
        let winningNumber = 0;
        let index = 0;
        for (let i = 1; i < this.players + 1; i++) {
            let playerTotal = this.$store.getters.getPlayerTotal(`P${i}`);
            if (playerTotal < 21 && playerTotal > winningNumber) {
                winningNumber = playerTotal;
                index = i;
            } else if (playerTotal === 21) {
                winningNumber = 22;
                index = i;
                this.enableWinner(`P${i}`);
                break;
            }
        }
        if (this.total <= 21 && this.total > winningNumber) {
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
      this.$eventBus.$on('reset field', () => {
        this.active = [];
        this.names = [];
        this.setAreasActive();
        this.setPlayerNames();
        this.resetBlackjack(null, 500, 2100);
      });
  },
  data() {
    return {
      names: [],
      active: [],
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
    border: 1px solid white;
}

.right-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 73vw;
    top: 37.5vh;
    border: 1px solid white;
}

.top-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 37vw;
    top: 2vh;
    border: 1px solid white;
}

.main-player {
    position: absolute;
    width: 26vw;
    height: 25vh;
    left: 37vw;
    top: 73vh;
    border: 1px solid white;
}

.house {
    position: absolute;
    width: 40vw;
    height: 30vh;
    left: 30vw;
    top: 35vh;
    border: 1px solid white;
}

.card-hand {
  display: grid;
  grid-template-columns: repeat(3, 100px);
}
.house-hand {
  display: grid;
  grid-template-columns: repeat(4, 100px);
}

@media screen and (max-width: 1024px) {
    .text {
        text-align: center;
        font-family: 'Comm Bold';
        color: white;
        font-size: 2.5vw;
    }
    .left-player {
        position: absolute;
        width: 45vw;
        height: 25vh;
        left: 51.5vw;
        top: 37.5vh;
        border: 1px solid white;
    }

    .right-player {
        position: absolute;
        width: 45vw;
        height: 25vh;
        left: 51.5vw;
        top: 70vh;
        border: 1px solid white;
    }

    .top-player {
        position: absolute;
        width: 45vw;
        height: 25vh;
        left: 3.5vw;
        top: 70vh;
        border: 1px solid white;
    }

    .main-player {
        position: absolute;
        width: 45vw;
        height: 25vh;
        left: 3.5vw;
        top: 37.5vh;
        border: 1px solid white;
    }

    .house {
        position: absolute;
        width: 70vw;
        height: 30vh;
        left: 15vw;
        top: 3vh;
        border: 1px solid white;
    }
    .card-hand {
        display: grid;
        grid-template-columns: repeat(3, 14vw);
    }

    .house-hand {
        display: grid;
        grid-template-columns: repeat(4, 16vw);
    }
    #house-text {
        margin: 7.5px;
    }
}
</style>