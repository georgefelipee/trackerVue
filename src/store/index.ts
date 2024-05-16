import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

import { EstadoProjeto, projeto } from "@/store/modulos/projeto";
import { EstadoTarefa, tarefa } from "@/store/modulos/tarefas";
export interface Estado {
  notificacoes: INotificacao[];
  projeto: EstadoProjeto;
  tarefa: EstadoTarefa;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: Array<INotificacao>(),
    projeto: {
      projetos: [],
    },
    tarefa: {
      tarefas: [],
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes.reverse();
        state.notificacoes.pop();
        state.notificacoes.reverse();

        console.log("Removendo notificação", state.notificacoes);
      }, 5000);
    },
  },
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
