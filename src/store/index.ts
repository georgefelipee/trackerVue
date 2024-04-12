import {IProjeto} from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import {ADD_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR} from "@/store/tipo-mutacoes";
import {INotificacao, TipoNotificacao} from "@/interfaces/INotificacao";
import notificacoes from "@/components/Notificacoes.vue";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key : InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: Array<INotificacao>()
    },
    mutations: {
        [ADD_PROJETO](state,nomeDoProjeto : string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state, projeto : IProjeto){
            const index = state.projetos.findIndex(p => p.id === projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id !== id)
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
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}