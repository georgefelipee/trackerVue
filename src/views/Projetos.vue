<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useStore} from "@/store";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Projetos",
  setup() {
    const store = useStore()
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
})
</script>

<template>
  <section class="projetos">
    <h1 class="title"> Projetos </h1>
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
          <router-link class="button" :to="`/projetos/novo/${projeto.id}`">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </section>

</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>