<template>
<div>
    <div v-if="loading"  class="loading-screen">
    </div>
    <h3 v-if="loading" class="loading-text">Loading</h3>
</div>
</template>

<script>
import { EventBus } from '../main'

export default {
  name: 'Loader',
  data() {
    return {
        loading: false
    }
  },
  created() {
        EventBus.$on('loading', data => {
          console.log(data);
          this.toggleLoading();
        });
  },
  methods: {
      toggleLoading: function() {
          this.loading = !this.loading;
      }
  }
}
</script>

<style>
.loading-text {
  position: absolute;
  text-align: center;
  margin: auto;
  top: 46.5%;
  left: 48%;
  font-family: 'Comm Bold';
  z-index: 4;
  color: white;
}

.loading-screen {
  position: absolute;
  background-color: #45a173;
  opacity: .3;
  filter: brightness(.1);
  width: 100vw;
  height: 100vh;
  z-index: 3;
}

@font-face {
    font-family: 'Comm Bold';
    src: url('../assets/fonts/Commissioner-SemiBold.ttf');
}
</style>
