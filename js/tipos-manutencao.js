let tipos = [];
let contadorId = 1;

document.getElementById("form-tipo").addEventListener("submit", function (e) {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value;

    const novoTipo = {
        id: contadorId++,
        descricao
    };

    tipos.push(novoTipo);
    atualizarTabela();
    this.reset();
});

function atualizarTabela() {
    const tabela = document.getElementById("tabela-tipos");
    tabela.innerHTML = "";

    tipos.forEach(tipo => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tipo.id}</td>
            <td>${tipo.descricao}</td>
            <td>
                <button onclick="consultar(${tipo.id})">Consultar</button>
                <button onclick="alterar(${tipo.id})">Alterar</button>
                <button onclick="excluir(${tipo.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function consultar(id) {
    const tipo = tipos.find(t => t.id === id);
    alert(`Tipo ${tipo.id}: ${tipo.descricao}`);
}

function alterar(id) {
    const tipo = tipos.find(t => t.id === id);
    const novaDescricao = prompt("Nova descrição:", tipo.descricao);

    if (novaDescricao) {
        tipo.descricao = novaDescricao;
        atualizarTabela();
    }
}

function excluir(id) {
    if (confirm("Deseja excluir este tipo de manutenção?")) {
        tipos = tipos.filter(t => t.id !== id);
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