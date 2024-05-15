
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import {
    ADD_TAREFAS, ALTERA_TAREFA,
    DEFINIR_TAREFAS,
    NOTIFICAR
} from "@/store/tipo-mutacoes";
import {INotificacao} from "@/interfaces/INotificacao";
import {
    ALTERAR_TAREFA_ASYNC,
    CADASTRAR_TAREFAS,
    OBTER_TAREFAS,
} from "@/store/tipo-actions";
import clientHttp from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import {EstadoProjeto, projeto} from "@/store/modulos/projeto";
export interface Estado {
    notificacoes: INotificacao[],
    tarefas: ITarefa[],
    projeto: EstadoProjeto
}

export const key : InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: Array<INotificacao>(),
        projeto: {
            projetos: []
        }
    },
    mutations: {

        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas;
        },
        [ADD_TAREFAS](state,tarefa : ITarefa){
            const tarefaPayload = {
                id: new Date().toISOString(),
                duracaoEmSegundos: tarefa.duracaoEmSegundos,
                descricao: tarefa.descricao,
                projeto: {
                    id: tarefa.projeto.id,
                    nome: tarefa.projeto.nome
                }
            } as ITarefa
            state.tarefas.push(tarefaPayload)
        },
        [ALTERA_TAREFA](state, tarefa : ITarefa){
            const index = state.tarefas.findIndex(t => t.id === tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){

            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao)

            setTimeout( () => {

                state.notificacoes.reverse()
                state.notificacoes.pop()
                state.notificacoes.reverse()


                console.log("Removendo notificação", state.notificacoes)
            },5000)
        }
    },
    actions: {
        [OBTER_TAREFAS] ({commit}){
            clientHttp.get('tarefas')
                .then(res => {
                    commit(DEFINIR_TAREFAS,res.data)
                })
        },
        [CADASTRAR_TAREFAS] ({commit}, tarefa: ITarefa){
            return  clientHttp.post('tarefas',tarefa)
                .then(res => {
                    commit(ADD_TAREFAS,res.data)
                }
            )
        },
        [ALTERAR_TAREFA_ASYNC] ({commit},tarefa: ITarefa){
            return clientHttp.put(`/tarefas/${tarefa.id}`,tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))

        },
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}