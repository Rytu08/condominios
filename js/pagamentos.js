let pagamentos = [];
let moradores = [];
let contadorId = 1;

const selectMorador = document.getElementById("morador");
moradores.forEach(nome => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    selectMorador.appendChild(option);
});

document.getElementById("form-pagamento").addEventListener("submit", function (e) {
    e.preventDefault();

    const morador = document.getElementById("morador").value;
    const referencia = document.getElementById("referencia").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const vencimento = document.getElementById("vencimento").value;
    const data_pagamento = document.getElementById("data_pagamento").value;

    const novoPagamento = {
        id: contadorId++,
        morador,
        referencia,
        valor,
        vencimento,
        data_pagamento
    };

    pagamentos.push(novoPagamento);
    atualizarTabela();
    this.reset();
});

function atualizarTabela() {
    const tabela = document.getElementById("tabela-pagamentos");
    tabela.innerHTML = "";

    pagamentos.forEach(p => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${p.id}</td>
            <td>${p.morador}</td>
            <td>${p.referencia}</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td>${p.vencimento}</td>
            <td>${p.data_pagamento}</td>
            <td>
                <button onclick="consultar(${p.id})">Consultar</button>
                <button onclick="alterar(${p.id})">Alterar</button>
                <button onclick="excluir(${p.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function consultar(id) {
    const p = pagamentos.find(p => p.id === id);
    alert(`Pagamento ${p.id} de ${p.morador} referente a ${p.referencia}, valor R$ ${p.valor.toFixed(2)}.`);
}

function alterar(id) {
    const p = pagamentos.find(p => p.id === id);
    const novaReferencia = prompt("Nova referência:", p.referencia);
    const novoValor = prompt("Novo valor:", p.valor);
    const novoVencimento = prompt("Novo vencimento:", p.vencimento);
    const novaData = prompt("Nova data de pagamento:", p.data_pagamento);

    if (novaReferencia && novoValor && novoVencimento && novaData) {
        p.referencia = novaReferencia;
        p.valor = parseFloat(novoValor);
        p.vencimento = novoVencimento;
        p.data_pagamento = novaData;
        atualizarTabela();
    }
}

function excluir(id) {
    if (confirm("Deseja excluir este pagamento?")) {
        pagamentos = pagamentos.filter(p => p.id !== id);
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