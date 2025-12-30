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

  localStorage.setItem("fila", JSON.stringify(fila));
  document.getElementById("placa").value = "";
  document.getElementById("compartimento").value = "";

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
    `;
    tbody.appendChild(tr);
  });
}

renderizar();

