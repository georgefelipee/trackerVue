<script lang="ts">
import {computed, defineComponent} from 'vue'
import Temporizador from "@/components/Temporizador.vue";
import {useStore} from "vuex";
import {key, store} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  emits: ['salvarTarefa'],
  components: {Temporizador,},
  data() {
    return {
      descricaoTarefa: '',
      idProjeto: ''
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      if(!this.idProjeto){
        store.commit('NOTIFICAR', {
          tipo: TipoNotificacao.FALHA,
          titulo: 'Projeto não selecionado',
          texto: 'Selecione um projeto para salvar a tarefa'
        })
        return
      }
      this.$emit('salvarTarefa', {
          descricao: this.descricaoTarefa,
          duracaoEmSegundos: tempoDecorrido,
          projeto: this.projetos.find(proj => proj.id == this.idProjeto)
        })
      this.descricaoTarefa = ''
    }
  },
  setup() {

    const store = useStore(key)
    return {
      projetos: computed(() => store.state.projetos)
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