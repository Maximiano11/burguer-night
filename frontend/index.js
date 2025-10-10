// Conexão Socket.IO
const socket = io("https://burguer-night.onrender.com");

// Formulário de pedidos
const form = document.getElementById("pedidoForm");
const pedidosList = document.getElementById("pedidosList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome_cliente = document.getElementById("nomeCliente").value;
  const quantidade_combos = Number(
    document.getElementById("quantidadeCombos").value
  );
  const refrigerantes = document
    .getElementById("refrigerantes")
    .value.split(",");

  const pedido = { nome_cliente, quantidade_combos, refrigerantes };

  try {
    const response = await fetch("https://burguer-night.onrender.com/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar pedido");
    }

    const novoPedido = await response.json();

    // Emitindo via Socket.IO
    socket.emit("novoPedido", novoPedido);

    form.reset();
  } catch (error) {
    console.error(error);
    alert("Erro ao enviar pedido. Veja o console.");
  }
});

// Recebendo pedidos em tempo real
socket.on("pedidoRecebido", (pedido) => {
  const li = document.createElement("li");
  li.textContent = `Pedido #${pedido.numero_pedido}: ${pedido.nome_cliente} - ${pedido.quantidade_combos} combos`;
  pedidosList.appendChild(li);
});
