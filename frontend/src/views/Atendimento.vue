<template>
  <div>
    <h2>Criar Pedido</h2>
    <form @submit.prevent="enviarPedido">
      <div>
        <label>Nome do Cliente:</label>
        <input type="text" v-model="nomeCliente" required />
      </div>

      <div>
        <label>Quantidade de Combos:</label>
        <input
          type="number"
          v-model.number="quantidadeCombos"
          min="1"
          required
          @change="gerarRefrigerantes"
        />
      </div>

      <div v-for="(refri, index) in refrigerantes" :key="index">
        <label>Refrigerante do Combo {{ index + 1 }}:</label>
        <select v-model="refrigerantes[index]" required>
          <option disabled value="">Escolha</option>
          <option value="Coca-Cola">Coca-Cola</option>
          <option value="Coca-Zero">Coca-Zero</option>
          <option value="Guarana">Guaraná</option>
        </select>
      </div>

      <button type="submit">Enviar Pedido</button>
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
label { display: block; margin-top: 10px; font-weight: bold; }
select, input { padding: 5px; margin-top: 5px; }
button { margin-top: 15px; padding: 8px 15px; border: none; background-color: #333; color: white; cursor: pointer; border-radius: 4px; }
button:hover { opacity: 0.8; }
</style>
