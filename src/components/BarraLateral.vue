<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BarraLateral",
  emits: ['aoTemaAlterado'],
  data(){
    return {
      modoEscuroAtivo: false
    }
  },
  computed:{
    textoBotao() : string {
      if (this.modoEscuroAtivo){
        return 'Desativar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  methods:{
    alterarTema(){
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  }
})
</script>

<template>
<header>
  <h1>
    <img src="@/assets/logo.png" alt="">
  </h1>
  <button class="button" @click="alterarTema">
    {{ textoBotao }}
  </button>
  <nav class="panel mt-5">
    <ul>
      <li>
        <router-link to="/" class="link">
          <i class="fas fa-tasks"></i>
           tarefas
        </router-link>
      </li>
      <li>
        <router-link to="/projetos" class="link">
          <i class="fas fa-project-diagram"></i>
          projetos
        </router-link>
      </li>
    </ul>
  </nav>
</header>
</template>

<style scoped>

header{
  background-color: #0d3b66;
  width: 100%;
  padding: 1rem;
  height: 100vh;
  text-align: center;
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}

@media only screen and (max-width: 768px){
  header{
    height: auto;
    padding: 2.5rem;
  }
}
</style>