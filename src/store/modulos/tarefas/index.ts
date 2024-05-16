import { Module } from "vuex";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import {
  ADD_TAREFAS,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
} from "@/store/tipo-mutacoes";
import {
  ALTERAR_TAREFA_ASYNC,
  CADASTRAR_TAREFAS,
  OBTER_TAREFAS,
} from "@/store/tipo-actions";
import clientHttp from "@/http";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADD_TAREFAS](state, tarefa: ITarefa) {
      const tarefaPayload = {
        id: new Date().toISOString(),
        duracaoEmSegundos: tarefa.duracaoEmSegundos,
        descricao: tarefa.descricao,
        projeto: {
          id: tarefa.projeto.id,
          nome: tarefa.projeto.nome,
        },
      } as ITarefa;
      state.tarefas.push(tarefaPayload);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas";
      if (filtro) {
        url += `?descricao=${filtro}`;
      }
      clientHttp
        .get(url)
        .then((res) => {
          commit(DEFINIR_TAREFAS, res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa) {
      return clientHttp.post("tarefas", tarefa).then((res) => {
        commit(ADD_TAREFAS, res.data);
      });
    },
    [ALTERAR_TAREFA_ASYNC]({ commit }, tarefa: ITarefa) {
      return clientHttp
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  },
};
