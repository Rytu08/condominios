let moradores = [];
let apartamentos = ["Apto 101 - Bloco A", "Apto 202 - Bloco B", "Apto 303 - Bloco C"];
let contadorId = 1;

const selectApto = document.getElementById("apartamento");
apartamentos.forEach(apto => {
    const option = document.createElement("option");
    option.value = apto;
    option.textContent = apto;
    selectApto.appendChild(option);
});

document.getElementById("form-morador").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const apartamento = document.getElementById("apartamento").value;

    const novoMorador = {
        id: contadorId++,
        nome,
        cpf,
        telefone,
        apartamento
    };

    moradores.push(novoMorador);
    atualizarTabela();
    this.reset();
});

function atualizarTabela() {
    const tabela = document.getElementById("tabela-moradores");
    tabela.innerHTML = "";

    moradores.forEach(m => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${m.id}</td>
            <td>${m.nome}</td>
            <td>${m.cpf}</td>
            <td>${m.telefone}</td>
            <td>${m.apartamento}</td>
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
    const m = moradores.find(m => m.id === id);
    alert(`Morador ${m.id}: ${m.nome}, CPF ${m.cpf}, Tel ${m.telefone}, Apto ${m.apartamento}`);
}

function alterar(id) {
    const m = moradores.find(m => m.id === id);
    const novoNome = prompt("Novo nome:", m.nome);
    const novoCpf = prompt("Novo CPF:", m.cpf);
    const novoTel = prompt("Novo telefone:", m.telefone);
    const novoApto = prompt("Novo apartamento:", m.apartamento);

    if (novoNome && novoCpf && novoApto) {
        m.nome = novoNome;
        m.cpf = novoCpf;
        m.telefone = novoTel;
        m.apartamento = novoApto;
        atualizarTabela();
    }
}

function excluir(id) {
    if (confirm("Deseja excluir este morador?")) {
        moradores = moradores.filter(m => m.id !== id);
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