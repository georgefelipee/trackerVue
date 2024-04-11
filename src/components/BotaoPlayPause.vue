<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BotaoPlayPause",
  props: {
    desabilitado: {type: Boolean, required: true},
    textoBotao: {type: String, required: true},
    icone: {type: String, required: true}
  },
  methods: {
    clicado() {
      this.$emit('clicado')
    }
  },
  emits: ['clicado']
})
</script>

<template>
  <button @click="clicado" class="button" :disabled="desabilitado">
           <span class="icon">
              <i :class="icone"></i>
           </span>
    <span>{{textoBotao}}</span>
  </button>
</template>

<style scoped>

</style>