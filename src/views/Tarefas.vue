<template>
    <Formulario @salvarTarefa="adicionarTarefa"/>
    <div class="lista">
      <Tarefa @ao-tarefa-clicada="selecionarTarefa" v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa"/>
      <Box v-if="listaEstaVazia">Você não está muito produtivo hoje!</Box>
      <div class="modal" :class="{'is-active' : tarefaSelecionada}" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar Tarefa</p>
            <button @click="fecharModal" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label for="descricaoTarefa" class="label">
               Descrição
              </label>
              <input
                  v-model="tarefaSelecionada.descricao"
                  type="text"
                  id="descricaoTarefa"
                  class="input"
                  required>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
              <button class="button" @click="fecharModal">Cancelar</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Formulario from "@/components/Formulario.vue";
import Tarefa from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";
import {useStore} from "@/store";
import {ALTERAR_TAREFA_ASYNC, CADASTRAR_TAREFAS, OBTER_PROJETOS, OBTER_TAREFAS} from "@/store/tipo-actions";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tarefas',
  components: {Box, Tarefa, Formulario},
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  },
  data () {
    return{
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    adicionarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal(){
      this.tarefaSelecionada = null
    },
    alterarTarefa(){
      this.store.dispatch(ALTERAR_TAREFA_ASYNC, this.tarefaSelecionada)
          .then(() => this.fecharModal())
    }
  }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
