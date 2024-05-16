<template>
  <Formulario @salvarTarefa="adicionarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Digite para buscar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      @ao-tarefa-clicada="selecionarTarefa"
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
    <Box v-if="listaEstaVazia()">Você não está muito produtivo hoje!</Box>
  </div>
  <Modal :mostrar="tarefaSelecionada != null">
    <template v-slot:header>
      <p class="modal-card-title">Editar Tarefa</p>
      <button @click="fecharModal" class="delete" aria-label="close"></button>
    </template>
    <template v-slot:body>
      <div class="field">
        <label for="descricaoTarefa" class="label"> Descrição </label>
        <input
          v-model="tarefaSelecionada!.descricao"
          type="text"
          id="descricaoTarefa"
          class="input"
          required
        />
      </div>
    </template>
    <template v-slot:footer>
      <button class="button is-success" @click="alterarTarefa">
        Salvar alterações
      </button>
      <button class="button" @click="fecharModal">Cancelar</button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "@/components/Formulario.vue";
import Tarefa from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA_ASYNC,
  CADASTRAR_TAREFAS,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-actions";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tarefas",
  components: { Modal, Box, Tarefa, Formulario },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas?.filter(
    //     (t) => !filtro.value || t.descricao?.includes(filtro.value)
    //   )
    // );
    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    const tarefas = computed(() => store.state.tarefa.tarefas);
    const listaEstaVazia = (): boolean => {
      if (tarefas.value) return tarefas?.value.length === 0;
      else return true;
    };
    console.log(tarefas);
    return {
      tarefas,
      filtro,
      store,
      listaEstaVazia,
    };
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    adicionarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA_ASYNC, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
