<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import {ALTERAR_PROJETO_ASYNC, CADASTRAR_PROJETO} from "@/store/tipo-actions";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  props: {
    id: {
      type: String,
    }
  },
  methods: {
    salvar(){
      if(this.id){
        this.store.dispatch(ALTERAR_PROJETO_ASYNC, {id: this.id, nome: this.nomeDoProjeto})
            .then(() => {this.lidaComSucesso()})
      }else{
        this.store.dispatch(CADASTRAR_PROJETO , this.nomeDoProjeto)
            .then(() => {this.lidaComSucesso()})
      }
      this.nomeDoProjeto = '';
      this.$router.push('/projetos');
    },
    lidaComSucesso(){
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto salvo com sucesso')
      this.$router.push('/projetos')
    }
  },
  setup(props){
    const store = useStore()
    const { notificar } = useNotificador()
    const nomeDoProjeto = ref("")

    if(props.id){
      const projeto = store.state.projeto.projetos
          .find(proj => proj.id === props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    return{
      store,
      notificar,
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