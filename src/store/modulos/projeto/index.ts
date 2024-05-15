import {IProjeto} from "@/interfaces/IProjeto";
import {Module} from "vuex";
import {Estado} from "@/store";
import {ADD_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO} from "@/store/tipo-mutacoes";
import {ALTERAR_PROJETO_ASYNC, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO_ASYNC} from "@/store/tipo-actions";
import clientHttp from "@/http";

export interface  EstadoProjeto {
    projetos: IProjeto[]

}

export const projeto: Module<EstadoProjeto, Estado> = {

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
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos;
        },

    },
    actions: {
        [OBTER_PROJETOS] ({commit}){
            clientHttp.get('projetos')
                .then(res => {
                    commit(DEFINIR_PROJETOS,res.data)
                })
        },
        [CADASTRAR_PROJETO] (contextom, nomeDoProjeto: string){
            return  clientHttp.post('projetos',{
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO_ASYNC] (contexto,projeto: IProjeto){
            return clientHttp.put(`/projetos/${projeto.id}`,{
                nome: projeto.nome
            })

        },
        [REMOVER_PROJETO_ASYNC]( {commit}, id: string){
            return clientHttp.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
}