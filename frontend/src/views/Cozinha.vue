<template>
  <div class="container">
    <h2 class="title">Pedidos na Cozinha</h2>

    <div v-if="pedidos.length === 0" class="empty">
      Nenhum pedido no momento.
    </div>

    <div
      v-for="pedido in pedidos"
      :key="pedido.id"
      class="pedido-card"
      :class="statusClass(pedido.status)"
    >
      <div class="pedido-header">
        <h3>Pedido {{ pedido.numero_pedido }} - {{ pedido.nome_cliente }}</h3>
        <span class="status-label">{{ pedido.status }}</span>
      </div>

      <ul class="combo-list">
        <li v-for="(refri, index) in pedido.refrigerantes" :key="index">
          Combo {{ index + 1 }}: {{ refri }}
        </li>
      </ul>

      <div class="buttons">
        <button
          v-if="pedido.status === 'Pendente'"
          @click="mudarStatus(pedido.id, 'Em Preparo')"
        >
          Em Preparo
        </button>
        <button
          v-else-if="pedido.status === 'Em Preparo'"
          @click="mudarStatus(pedido.id, 'Pronto')"
        >
          Pronto
        </button>
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
    this.socket = io("http://localhost:4001");

    this.socket.on("novo-pedido", (pedido) => {
      this.pedidos.push(pedido);
    });

    this.socket.on("atualizacao-status", (pedidoAtualizado) => {
      const index = this.pedidos.findIndex((p) => p.id === pedidoAtualizado.id);
      if (index !== -1) this.pedidos[index] = pedidoAtualizado;
    });
  },
  methods: {
    async buscarPedidos() {
      try {
        const res = await api.get("/pedidos");
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
.container {
  max-width: 700px;
  margin: 40px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 25px;
}

.empty {
  text-align: center;
  color: #777;
  font-size: 1.2rem;
}

/* Cartão de pedido */
.pedido-card {
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.2s;
}

.pedido-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

/* Cores de status */
.status-pendente {
  border-left: 5px solid #fdd835;
}
.status-preparo {
  border-left: 5px solid #ff8f00;
}
.status-pronto {
  border-left: 5px solid #43a047;
}

.pedido-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-label {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  background-color: #555;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.combo-list {
  margin-top: 10px;
  padding-left: 20px;
}

.buttons {
  margin-top: 15px;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  margin-right: 10px;
  transition: all 0.2s;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}
</style>
