// circulacoes.js
const listaPlacas = document.getElementById("listaPlacas");
const loading = document.getElementById("loading");

async function obterPlacas() {
  try {
    const response = await fetch(
      "http://localhost:8080/estacionamentos/listar-placas"
    ); // Porta 8080
    // Certifique-se de que a rota esteja correta
    if (!response.ok) {
      throw new Error("Erro ao buscar placas");
    }

    const placas = await response.json(); // Atribui a resposta diretamente à variável 'placas'

    listaPlacas.innerHTML = "";
    loading.style.display = "none";

    placas.forEach((placa) => {
      const li = document.createElement("li");
      li.textContent = placa.placa;
      listaPlacas.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao obter placas:", error);
    loading.textContent = "Erro ao carregar dados";
  }
}

obterPlacas();
