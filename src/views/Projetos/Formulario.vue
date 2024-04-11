<script lang="ts">
import { defineComponent} from 'vue'
import {useStore} from "@/store";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  data () {
    return {
      nomeDoProjeto: '',
    }
  },
  props: {
    id: {
      type: String,
    }
  },
  mounted () {
    if(this.id){
      const projeto = this.store.state.projetos.find(proj => proj.id === this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  methods: {
    salvar(){
      if(this.id){
        this.store.commit('ALTERAR_PROJETO', {id: this.id, nome: this.nomeDoProjeto})
        this.nomeDoProjeto = '';
        this.$router.push('/projetos');
      }else{
        this.store.commit('ADD_PROJETO', this.nomeDoProjeto)
        this.nomeDoProjeto = '';
        this.$router.push('/projetos');
      }
    }
  },
  setup(){
    const store = useStore()
    return{
      store,
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