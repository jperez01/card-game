<template>
    <div>
        <router-link class="home" to="/">Return Home </router-link>
        <div class="header">
            <button v-on:click="emitResetField" class="button"> Reset </button>
            <div class="header-info">
                <h3 class="header-label"> Moves </h3>
                <h3 class="header-item"> {{counter}} </h3>
                <h3 class="header-label"> Time </h3>
                <h3 class="header-item"> {{time}} </h3>
            </div>
            <button v-on:click="emitStartTimer" class="button"> Start </button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'GameHeader',
  methods: {
      emitResetField: function() {
          this.$emit('reset', null);
      },
      emitStartTimer: function() {
          this.$emit('start', null);
      }
  },
  created() {
      this.socket = this.$socket;
      this.socket.emit('get room users', null);
      this.socket.on('room users', numUsers => {
          this.currentNum = numUsers;
          console.log(this.currentNum);
      });
  },
  data() {
    return {
        currentNum: 0
    }
  }
}
</script>

<style>
.button {
  height: 40px;
  width: 100px;
  font-family: 'Comm Bold';
  font-size: 20px;
  color: white;
  align-self: center;
  background: none;
  border: 1px solid white;
  cursor: pointer;
}

.button:hover {
  background-color: rgba(66, 65, 65, .4);
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
  width: 100px;
}

.header-item {
  font-family: 'Comm Bold';
  color: white;
  margin: 0;
  text-align: center;
  font-size: 16px;
}

.header-label {
  font-family: 'Comm Bold';
  color: white;
  margin: 0;
  text-align: center;
  font-size: 20px;
}

.home {
  height: 25px;
  text-align: center;
  position: absolute;
  font-family: 'Comm Bold';
  color: white;
  font-size: 20px;
  padding: 10px;
  margin: 20px;
  text-decoration: none;
  border: 1px solid white;
}

.home:hover {
  background-color:rgba(66, 65, 65, .4);
}

@font-face {
    font-family: 'Comm Bold';
    src: url('../assets/fonts/Commissioner-SemiBold.ttf');
}
</style>