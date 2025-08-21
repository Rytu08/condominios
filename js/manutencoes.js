let manutencoes = [];
let tipos = ["Elétrica", "Hidráulica", "Limpeza", "Pintura"];
let contadorId = 1;

const selectTipo = document.getElementById("tipo");
tipos.forEach(tipo => {
    const option = document.createElement("option");
    option.value = tipo;
    option.textContent = tipo;
    selectTipo.appendChild(option);
});

document.getElementById("form-manutencao").addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;
    const local = document.getElementById("local").value;

    const novaManutencao = {
        id: contadorId++,
        tipo,
        data,
        local
    };

    manutencoes.push(novaManutencao);
    atualizarTabela();
    this.reset();
});

function atualizarTabela() {
    const tabela = document.getElementById("tabela-manutencoes");
    tabela.innerHTML = "";

    manutencoes.forEach(m => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${m.id}</td>
            <td>${m.tipo}</td>
            <td>${m.data}</td>
            <td>${m.local}</td>
            <td>
                <button onclick="consultar(${m.id})">Consultar</button>
                <button onclick="alterar(${m.id})">Alterar</button>
                <button onclick="excluir(${m.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function consultar(id) {
    const m = manutencoes.find(m => m.id === id);
    alert(`Manutenção ${m.id}: ${m.tipo} em ${m.local} na data ${m.data}`);
}

function alterar(id) {
    const m = manutencoes.find(m => m.id === id);
    const novoTipo = prompt("Novo tipo:", m.tipo);
    const novaData = prompt("Nova data:", m.data);
    const novoLocal = prompt("Novo local:", m.local);

    if (novoTipo && novaData && novoLocal) {
        m.tipo = novoTipo;
        m.data = novaData;
        m.local = novoLocal;
        atualizarTabela();
    }
}

function excluir(id) {
    if (confirm("Deseja excluir esta manutenção?")) {
        manutencoes = manutencoes.filter(m => m.id !== id);
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