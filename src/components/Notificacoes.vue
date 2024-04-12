<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Notificacoes",
  data () {
    return {
      contexto: {
        [TipoNotificacao.FALHA]: 'is-danger',
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.ATENCAO]: 'is-warning',
      }
    }
  },
  setup(){
    const store = useStore();
    return{
      notificacoes: store.state.notificacoes
    }
  }
})
</script>

<template>
  <div class="notificacoes">
    <article
        class="message"
        :class="contexto[notificacao.tipo]"
        v-for="notificacao in notificacoes"
        :key="notificacao.id"
    >
      <div class="message-header">{{ notificacao.titulo}}</div>
      <div class="message-body">
        {{notificacao.texto}}
        {{notificacao.nome}}
      </div>
    </article>
  </div>

</template>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 100;
}
</style>