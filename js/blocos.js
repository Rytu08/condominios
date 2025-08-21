let blocos = [];
let contadorBlocoId = 1;

document.getElementById("form-bloco").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome-bloco").value;

    const novoBloco = {
        id: contadorBlocoId++,
        nome
    };

    blocos.push(novoBloco);
    atualizarTabelaBlocos();
    this.reset();
});

function atualizarTabelaBlocos() {
    const tabela = document.getElementById("tabela-blocos");
    tabela.innerHTML = "";

    blocos.forEach(bloco => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${bloco.id}</td>
            <td>${bloco.nome}</td>
            <td>
                <button onclick="consultarBloco(${bloco.id})">Consultar</button>
                <button onclick="alterarBloco(${bloco.id})">Alterar</button>
                <button onclick="excluirBloco(${bloco.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function consultarBloco(id) {
    const bloco = blocos.find(b => b.id === id);
    alert(`Bloco ${bloco.id}: Nome ${bloco.nome}`);
}

function alterarBloco(id) {
    const bloco = blocos.find(b => b.id === id);
    const novoNome = prompt("Novo nome do bloco:", bloco.nome);

    if (novoNome) {
        bloco.nome = novoNome;
        atualizarTabelaBlocos();
    }
}

function excluirBloco(id) {
    if (confirm("Deseja excluir este bloco?")) {
        blocos = blocos.filter(b => b.id !== id);
        atualizarTabelaBlocos();
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