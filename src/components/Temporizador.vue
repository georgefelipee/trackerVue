<script lang="ts">
import {defineComponent} from 'vue'
import Cronometro from "@/components/Cronometro.vue";
import BotaoPlayPause from "@/components/BotaoPlayPause.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Temporizador",
  components: {BotaoPlayPause, Cronometro},
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  emits: ['temporizadorFinalizado'],
  methods: {
    iniciarContador() {
      this.cronometroRodando = true
      this.cronometro =
          setInterval(() => {
            this.tempoEmSegundos++
            console.log(this.tempoEmSegundos)
          }, 1000)
    },
    finalizarContador() {
      this.cronometroRodando = false
      clearInterval(this.cronometro)
      this.$emit('temporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    }

  }
})
</script>

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
    <BotaoPlayPause @clicado="iniciarContador" icone="fas fa-play" texto-botao="play" :desabilitado="cronometroRodando"/>
    <BotaoPlayPause @clicado="finalizarContador" icone="fas fa-stop" texto-botao="stop" :desabilitado="!cronometroRodando"/>
  </div>
</template>

<style scoped>

</style>