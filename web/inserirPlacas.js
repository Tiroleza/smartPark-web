const form = document.getElementById("formularioEstacionamento");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    alert("Por favor, preencha a placa corretamente.");
    return;
  }

  const placa = document.getElementById("placa-input").value;

  const response = await fetch("/estacionamentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ placa }),
  });

  if (response.ok) {
    const data = await response.json();
    const listaPlacas = document.getElementById("plates-list"); // Corrigido
    const li = document.createElement("li");
    li.textContent = data.placa;
    listaPlacas.appendChild(li);

    form.reset();
  } else {
    const errorData = await response.json();
    alert(`Erro: ${errorData.error}`);
  }
});
