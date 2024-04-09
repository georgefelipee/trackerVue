<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BarraLateral"
})
</script>

<template>
<header>
  <h1>
    <img src="@/assets/logo.png" alt="">
  </h1>
</header>
</template>

<style scoped>

header{
  background-color: #0d3b66;
  width: 100%;
  padding: 1rem;
  height: 100vh;
}
@media only screen and (max-width: 768px){
  header{
    height: auto;
    padding: 2.5rem;
  }
}
</style>