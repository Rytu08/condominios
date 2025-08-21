let apartamentos = [];
let blocos = ["A", "B", "C", "D"]; // Blocos simulados
let contadorId = 1;

const selectBloco = document.getElementById("bloco");
blocos.forEach(bloco => {
    const option = document.createElement("option");
    option.value = bloco;
    option.textContent = bloco;
    selectBloco.appendChild(option);
});

document.getElementById("form-apartamento").addEventListener("submit", function (e) {
    e.preventDefault();

    const numero = document.getElementById("numero").value;
    const bloco = document.getElementById("bloco").value;

    const novoApto = {
        id: contadorId++,
        numero,
        bloco
    };

    apartamentos.push(novoApto);
    atualizarTabela();
    this.reset();
});

function atualizarTabela() {
    const tabela = document.getElementById("tabela-apartamentos");
    tabela.innerHTML = "";

    apartamentos.forEach(apto => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${apto.id}</td>
            <td>${apto.numero}</td>
            <td>${apto.bloco}</td>
            <td>
                <button onclick="consultar(${apto.id})">Consultar</button>
                <button onclick="alterar(${apto.id})">Alterar</button>
                <button onclick="excluir(${apto.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function consultar(id) {
    const apto = apartamentos.find(a => a.id === id);
    alert(`Apartamento ${apto.id}: Número ${apto.numero}, Bloco ${apto.bloco}`);
}

function alterar(id) {
    const apto = apartamentos.find(a => a.id === id);
    const novoNumero = prompt("Novo número:", apto.numero);
    const novoBloco = prompt("Novo bloco:", apto.bloco);

    if (novoNumero && novoBloco) {
        apto.numero = novoNumero;
        apto.bloco = novoBloco;
        atualizarTabela();
    }
}

function excluir(id) {
    if (confirm("Deseja excluir este apartamento?")) {
        apartamentos = apartamentos.filter(a => a.id !== id);
        atualizarTabela();
    }
}

document.getElementById('pesquisa').addEventListener('input', function () {
  const termo = this.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const regex = new RegExp(`\\b${termo}\\b`, 'i');

  const linhas = document.querySelectorAll('tbody tr');

  linhas.forEach(linha => {
    const celulas = Array.from(linha.children);
    const encontrou = celulas.some(td => {
      const texto = td.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
      return regex.test(texto);
    });

    linha.style.display = encontrou ? '' : 'none';
  });
});