<template>
  <div>
    <div v-if="loading"  class="loading-screen">
      <h3 v-if="loading" class="loading-text">Loading</h3>
    </div>
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
    EventBus.$on('loading', () => {
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
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
}

.loading-screen {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.5);
}

@font-face {
    font-family: 'Comm Bold';
    src: url('../assets/fonts/Commissioner-SemiBold.ttf');
}
</style>
