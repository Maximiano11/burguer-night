<template>
  <div>
    <h1>Despachante</h1>
    <PedidoCard
      v-for="p in pedidosFiltrados"
      :key="p.id"
      :pedido="p"
      :mostrarBotoes="true"
    />
  </div>
</template>

<script>
import { api } from "../services/api.js";
import { socket } from "../services/socket.js";
import PedidoCard from "../components/PedidoCard.vue";

export default {
  components: { PedidoCard },
  data() {
    return { pedidos: [] };
  },
  computed: {
    pedidosFiltrados() {
      return this.pedidos.filter((p) => p.status === "Pronto");
    },
  },
  methods: {
    async carregarPedidos() {
      try {
        const res = await api.get("/pedidos");
        this.pedidos = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.carregarPedidos();

    socket.on("novo-pedido", (pedido) => this.pedidos.push(pedido));
    socket.on("atualizacao-status", (pedidoAtualizado) => {
      const index = this.pedidos.findIndex((p) => p.id === pedidoAtualizado.id);
      if (index !== -1) this.pedidos[index] = pedidoAtualizado;
    });
  },
};
</script>
