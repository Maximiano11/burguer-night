<template>
  <div
    :style="{
      border: '2px solid',
      borderColor: corStatus,
      padding: '10px',
      margin: '10px 0',
      borderRadius: '8px',
    }"
  >
    <p>
      <strong>Pedido #{{ pedido.numero_pedido }}</strong>
    </p>
    <p>Cliente: {{ pedido.nome_cliente }}</p>
    <p>Combos: {{ pedido.quantidade_combos }}</p>
    <p>Refrigerantes: {{ pedido.refrigerantes.join(", ") }}</p>
    <p>Status: {{ pedido.status }}</p>
    <div v-if="mostrarBotoes">
      <button
        v-if="pedido.status === 'Pendente'"
        @click="atualizarStatus('Em Preparo')"
      >
        Em Preparo
      </button>
      <button
        v-if="pedido.status === 'Em Preparo'"
        @click="atualizarStatus('Pronto')"
      >
        Pronto
      </button>
      <button
        v-if="pedido.status === 'Pronto'"
        @click="atualizarStatus('Entregue')"
      >
        Entregue
      </button>
    </div>
  </div>
</template>

<script>
import { api } from "../services/api";

export default {
  props: ["pedido", "mostrarBotoes"],
  methods: {
    async atualizarStatus(status) {
      await api.patch(`/pedidos/${this.pedido.id}/status`, { status });
    },
  },
  computed: {
    corStatus() {
      switch (this.pedido.status) {
        case "Pendente":
          return "yellow";
        case "Em Preparo":
          return "orange";
        case "Pronto":
          return "green";
        case "Entregue":
          return "blue";
      }
    },
  },
};
</script>
