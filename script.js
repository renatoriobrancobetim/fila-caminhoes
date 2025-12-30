let fila = JSON.parse(localStorage.getItem("fila")) || [];

function adicionar() {
  const placa = document.getElementById("placa").value.trim();
  const compartimento = document.getElementById("compartimento").value.trim();

  if (!placa || !compartimento) {
    alert("Preencha placa e compartimento");
    return;
  }

  const agora = new Date();

  fila.push({
    placa,
    compartimento,
    data: agora.toLocaleDateString(),
    hora: agora.toLocaleTimeString()
  });

  salvar();
  document.getElementById("placa").value = "";
  document.getElementById("compartimento").value = "";
}

function chamar() {
  if (fila.length === 0) {
    alert("Fila vazia");
    return;
  }

  const chamado = fila.shift();
  alert(`🔔 Caminhão chamado:\nPlaca: ${chamado.placa}\nCompartimento: ${chamado.compartimento}`);
  salvar();
}

function remover(index) {
  if (confirm("Remover este caminhão da fila?")) {
    fila.splice(index, 1);
    salvar();
  }
}

function salvar() {
  localStorage.setItem("fila", JSON.stringify(fila));
  renderizar();
}

function renderizar() {
  const tbody = document.getElementById("fila");
  tbody.innerHTML = "";

  fila.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.placa}</td>
      <td>${item.compartimento}</td>
      <td>${item.data}</td>
      <td>${item.hora}</td>
      <td>
        <button class="remover" onclick="remover(${index})">❌ Remover</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

renderizar();
