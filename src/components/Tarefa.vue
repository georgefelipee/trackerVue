<script lang="ts">
import {defineComponent, PropType} from 'vue'
import Cronometro from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tarefa",
  emits: ['aoTarefaClicada'],
  methods: {
    tarefaClicada() {
      this.$emit('aoTarefaClicada', this.tarefa)
    }
  },
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true }
  },
  components: {Box, Cronometro}
})
</script>

<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada()">
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
.clicavel{
  cursor: pointer;

}
</style>