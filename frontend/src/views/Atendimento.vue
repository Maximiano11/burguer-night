<template>
  <div class="container">
    <h2 class="title">Criar Pedido</h2>
    <form @submit.prevent="enviarPedido" class="form">
      <!-- Nome do Cliente -->
      <div class="form-group">
        <label>Nome do Cliente</label>
        <input
          type="text"
          v-model="nomeCliente"
          required
          placeholder="Digite o nome do cliente"
        />
      </div>

      <!-- Quantidade de Combos -->
      <div class="form-group">
        <label>Quantidade de Combos</label>
        <input
          type="number"
          v-model.number="quantidadeCombos"
          min="1"
          required
          @change="gerarRefrigerantes"
        />
      </div>

      <!-- Seleção de refrigerante para cada combo -->
      <div
        v-for="(refri, index) in refrigerantes"
        :key="index"
        class="form-group"
      >
        <label>Refrigerante do Combo {{ index + 1 }}</label>
        <select v-model="refrigerantes[index]" required>
          <option disabled value="">Escolha</option>
          <option value="Coca-Cola">Coca-Cola</option>
          <option value="Coca-Zero">Coca-Zero</option>
          <option value="Guarana">Guaraná</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Enviar Pedido</button>
    </form>
  </div>
</template>

<script>
import { api } from "../services/api.js";

export default {
  data() {
    return {
      nomeCliente: "",
      quantidadeCombos: 1,
      refrigerantes: [""],
    };
  },
  methods: {
    gerarRefrigerantes() {
      this.refrigerantes = Array(this.quantidadeCombos).fill("");
    },
    async enviarPedido() {
      try {
        const pedido = {
          nome_cliente: this.nomeCliente,
          quantidade_combos: this.quantidadeCombos,
          refrigerantes: this.refrigerantes,
        };
        const res = await api.post("/pedidos", pedido);
        alert(`Pedido ${res.data.numero_pedido} criado!`);

        // Resetar formulário
        this.nomeCliente = "";
        this.quantidadeCombos = 1;
        this.refrigerantes = [""];
      } catch (err) {
        console.error(err);
        alert("Erro ao criar pedido");
      }
    },
  },
  mounted() {
    this.gerarRefrigerantes();
  },
};
</script>

<style scoped>
/* Container principal */
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Título */
.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 25px;
}

/* Formulário */
.form {
  display: flex;
  flex-direction: column;
}

/* Grupos de campos */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

/* Inputs e Selects */
input,
select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Botão */
.btn-submit {
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 91, 187, 0.3);
}
</style>
