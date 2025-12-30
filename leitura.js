function renderizar() {
  const fila = JSON.parse(localStorage.getItem("fila")) || [];
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

// Atualiza automaticamente a cada 5 segundos
setInterval(renderizar, 5000);

