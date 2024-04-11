<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cronometro",
  props: {
    tempoEmSegundos: {type: Number, required: true}
  },
  computed: {
    tempoDecorrido () : string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8)
    }
  }
})
</script>

<template>
  <section>
    <strong class="display">{{tempoDecorrido}}</strong>
  </section>
</template>

<style scoped>
.display{
  color: var(--texto-primario);
}
</style>