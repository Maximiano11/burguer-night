<template>
  <div>
    <h2>Pedidos na Cozinha</h2>
    <div v-if="pedidos.length === 0">Nenhum pedido no momento.</div>

    <div
      v-for="pedido in pedidos"
      :key="pedido.id"
      class="pedido-card"
      :class="statusClass(pedido.status)"
    >
      <h3>Pedido {{ pedido.numero_pedido }} - {{ pedido.nome_cliente }}</h3>
      <p>Status: {{ pedido.status }}</p>

      <ul>
        <li v-for="(refri, index) in pedido.refrigerantes" :key="index">
          Combo {{ index + 1 }}: {{ refri }}
        </li>
      </ul>

      <div v-if="pedido.status === 'Pendente'">
        <button @click="mudarStatus(pedido.id, 'Em Preparo')">
          Em Preparo
        </button>
      </div>

      <div v-else-if="pedido.status === 'Em Preparo'">
        <button @click="mudarStatus(pedido.id, 'Pronto')">Pronto</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../services/api.js";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      pedidos: [],
      socket: null,
    };
  },
  created() {
    this.buscarPedidos();
    this.socket = io("https://burguer-night.onrender.com");

    // Receber novos pedidos em tempo real
    this.socket.on("novo-pedido", (pedido) => {
      this.pedidos.push(pedido);
    });

    // Atualizações de status em tempo real
    this.socket.on("atualizacao-status", (pedidoAtualizado) => {
      const index = this.pedidos.findIndex((p) => p.id === pedidoAtualizado.id);
      if (index !== -1) this.pedidos[index] = pedidoAtualizado;
    });
  },
  methods: {
    async buscarPedidos() {
      try {
        const res = await api.get("/pedidos");
        // Filtra pedidos Pendente ou Em Preparo
        this.pedidos = res.data.filter(
          (p) => p.status === "Pendente" || p.status === "Em Preparo"
        );
      } catch (err) {
        console.error(err);
      }
    },
    async mudarStatus(id, status) {
      try {
        await api.patch(`/pedidos/${id}/status`, { status });
        // A atualização real-time via socket já cuida da UI
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar status");
      }
    },
    statusClass(status) {
      switch (status) {
        case "Pendente":
          return "status-pendente";
        case "Em Preparo":
          return "status-preparo";
        case "Pronto":
          return "status-pronto";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.pedido-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.status-pendente {
  background-color: #fff59d; /* amarelo */
}

.status-preparo {
  background-color: #ffb74d; /* laranja */
}

.status-pronto {
  background-color: #81c784; /* verde */
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
