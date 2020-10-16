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
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 4;
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
</style>
