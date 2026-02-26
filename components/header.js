export function renderHeader(pageTitle, pageSubtitle) {

  const headerHTML = `
  <div class="topbar">
    <div class="navbar">

      <div class="nav-left">
        🚛 MONTEIRO ERP
      </div>

      <div class="page-title">
        ${pageTitle}
        <span>${pageSubtitle}</span>
      </div>

<div class="nav-right">
  <a href="index.html">🧭 Controle Fila</a>
  <a href="painel.html">📊 Painel</a>
  <a href="programacao.html">📦 Programação</a>
  <a href="leitura.html">📺 Fila TV</a>
  <a href="motoristas.html">🚛 Motoristas</a>
  <a href="frete.html">💰 Frete</a>
  <a href="usuarios-admin.html">👥 Usuários</a>
  <a href="consumo-firestore.html">🔥 Consumo</a>
</div>

    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Destacar página ativa
  const links = document.querySelectorAll(".nav-right a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link=>{
    if(link.getAttribute("href") === currentPage){
      link.classList.add("active");
    }
  });
}
