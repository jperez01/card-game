<template>
  <div id="app" class="field">
    <h3 class="title"> Games </h3>
    <router-link class="link" to="/matching"> Matching </router-link>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style>

.field {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #45a173;
  flex-direction: column;
  align-items: center;
}

.link {
    height: 25px;
    text-align: center;
    font-family: 'Comm Bold';
    color: white;
    font-size: 20px;
    padding: 10px;
    margin: 20px;
    text-decoration: none;
    border: 1px solid white;
}

.link:hover {
  background-color:rgba(66, 65, 65, .4);
}

.title {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 24px;
  margin: 20px 0px 0px 0px;
}
</style>
