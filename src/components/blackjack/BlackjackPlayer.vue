<template>
    <div>
        <HouseArea :name='"House"' class="house" />
        <PlayerArea :name=names[0] class="main-player" />
        <SidePlayerArea :name=names[1] class="left-player" />
        <SidePlayerArea :name=names[3] class="top-player" />
        <SidePlayerArea :name=names[2] class="right-player" />
        <button v-on:click="resetField"> Collect Cards </button>
        <button v-on:click="moveToOriginalPosition"> Spread Cards </button>
    </div>
</template>

<script>
import HouseArea from './HouseArea';
import PlayerArea from './PlayerArea';
import SidePlayerArea from './SidePlayerArea';
import DeckFunctions from '../../services/DeckFunctions';

export default {
  name: 'BlackjackPlayer',
  mixins: [DeckFunctions],
  components: {
      PlayerArea,
      SidePlayerArea,
      HouseArea
  },
  methods: {
  },
  created() {
      this.names = ['P1', 'P2', 'P3', 'P4'];
  },
  data() {
    return {
      playing: false,
      spectating: false,
      names: []
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