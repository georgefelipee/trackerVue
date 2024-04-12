<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Projetos",

})
</script>

<template>
  <div class="projetos">
    <h1 class="title"> Projetos </h1>
  </div>
  <router-view></router-view>
</template>

<style >
.projetos {
  padding: 1.25rem;
}
</style>