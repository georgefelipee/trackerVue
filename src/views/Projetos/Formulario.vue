<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import {ALTERAR_PROJETO_ASYNC, CADASTRAR_PROJETO} from "@/store/tipo-actions";
import {useRouter} from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  props: {
    id: {
      type: String,
    }
  },
  setup(props){
    const router = useRouter()
    const store = useStore()
    const { notificar } = useNotificador()
    const nomeDoProjeto = ref("")

    if(props.id){
      const projeto = store.state.projeto.projetos
          .find(proj => proj.id === props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const lidaComSucesso = () =>{
      nomeDoProjeto.value = "";
      notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto salvo com sucesso')
      router.push('/projetos')
    }

    const salvar = () => {
      if(props.id){
        store.dispatch(ALTERAR_PROJETO_ASYNC, {id: props.id, nome: nomeDoProjeto.value})
            .then(() => {lidaComSucesso()})
      }else{
        store.dispatch(CADASTRAR_PROJETO , nomeDoProjeto.value)
            .then(() => {lidaComSucesso()})
      }
      nomeDoProjeto.value = '';
      router.push('/projetos');
    }

    return{
      salvar,
      nomeDoProjeto
    }
  }
})
</script>

<template>
  <section class="projetos">
    <h1 class="title"> Projetos </h1>
    <form @submit.prevent="salvar()">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do projeto
        </label>
        <input
            v-model="nomeDoProjeto"
            type="text" id="nomeDoProjeto"
            class="input" required>
      </div>
      <div class="field">
        <button type="submit" class="button">
          Salvar
        </button>
      </div>
    </form>
  </section>

</template>

<style scoped>
.projetos{
  padding: 1.25rem;
}
</style>