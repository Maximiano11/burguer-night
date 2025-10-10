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
import { api } from "../services/api";
import { io } from "socket.io-client";
import PedidoCard from "../components/PedidoCard.vue";

const socket = io("https://burguer-night.onrender.com");

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
      const res = await api.get("/pedidos");
      this.pedidos = res.data;
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
