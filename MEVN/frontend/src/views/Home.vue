<template>
  <div class="home">
    <Header />
    <h1> HI Jay </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue';
export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>
