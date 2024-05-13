<script lang="ts">
import {defineComponent, PropType} from 'vue'
import Cronometro from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tarefa",
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true }
  },
  components: {Box, Cronometro}
})
</script>

<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{tarefa.descricao || "Tarefa sem descrição"}}
      </div>
      <div class="column is-3">
        {{tarefa.projeto?.nome || "N/D"}}
      </div>
      <div class="column">
        <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" ></Cronometro>
      </div>
    </div>
  </Box>

</template>

<style scoped>
</style>