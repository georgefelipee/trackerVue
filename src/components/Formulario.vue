<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import Temporizador from "@/components/Temporizador.vue";
import {useStore} from "vuex";
import {key, store} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  emits: ['salvarTarefa'],
  components: {Temporizador,},
  setup(props, {emit}) {
    const store = useStore(key)

    const descricaoTarefa = ref("")
    const idProjeto = ref('')

    const projetos = computed(() => store.state.projeto.projetos)

    const finalizarTarefa = (tempoDecorrido: number): void => {
      if(!idProjeto.value){
      store.commit('NOTIFICAR', {
        tipo: TipoNotificacao.FALHA,
        titulo: 'Projeto não selecionado',
        texto: 'Selecione um projeto para salvar a tarefa'
      })
      return
    }
    emit('salvarTarefa', {
      descricao: descricaoTarefa,
      duracaoEmSegundos: tempoDecorrido,
      projeto: projetos.value.find(proj => proj.id == idProjeto.value)
    })

    descricaoTarefa.value = ''
  }
    return {
      projetos: computed(() => store.state.projeto.projetos),
      descricaoTarefa,
      idProjeto,
      finalizarTarefa
    }
  }
})
</script>

<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formuĺario para criação de uma nova tarefa">
        <input
            type="text"
            class="input"
            placeholder="Qual tarefa você deseja iniciar ?"
            v-model="descricaoTarefa"
        >
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
                v-for="projeto in projetos"
                :value="projeto.id"
                :key="projeto.id"
            >
              {{ projeto.nome}}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Temporizador @temporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<style >

.formulario{
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>