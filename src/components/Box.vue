<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Box",
  data(){
    return {
      estilos: {
        backgroundColor: '#FAF0CA',
        padding: "1.25rem"
      }
    }
  },
})
</script>

<template>
<div class="box has-text-weight-bold" :style="estilos">
  <slot></slot>
</div>
</template>

<style scoped>

</style>