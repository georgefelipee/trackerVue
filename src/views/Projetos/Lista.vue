<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useStore} from "@/store";
import {OBTER_PROJETOS, REMOVER_PROJETO_ASYNC} from "@/store/tipo-actions";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lista",
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store
    }
  },
  methods: {
    excluir(id: string){
      this.store.dispatch(REMOVER_PROJETO_ASYNC, id)
    }
  }
})
</script>

<template>
  <section class="projetos">
    <router-link class="button" to="/projetos/novo">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>
          Ações
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.nome }}</td>
        <td>
          <router-link class="button" :to="`/projetos/${projeto.id}`">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
          </router-link>
          <button @click="excluir(projeto.id)" class="button ml-2 is-danger">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>

</template>

<style scoped>

</style>