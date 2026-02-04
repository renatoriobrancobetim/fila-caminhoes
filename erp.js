document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu-link");
  const tabs = document.getElementById("erp-tabs");
  const views = document.getElementById("erp-views");
  const title = document.getElementById("page-title");

  function activateTab(id) {
    document.querySelectorAll(".erp-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".erp-view").forEach(v => v.classList.remove("active"));

    document.getElementById("tab-" + id).classList.add("active");
    document.getElementById("view-" + id).classList.add("active");

    title.innerText = document.getElementById("tab-" + id).dataset.title;
  }

  function closeTab(id) {
    const tab = document.getElementById("tab-" + id);
    const view = document.getElementById("view-" + id);

    const isActive = tab.classList.contains("active");

    tab.remove();
    view.remove();

    if (isActive) {
      const lastTab = document.querySelector(".erp-tab:last-child");
      if (lastTab) activateTab(lastTab.dataset.id);
    }
  }

  function openTab(url, label) {
    const id = btoa(url).replace(/=/g, "");

    // Se já existe
    if (document.getElementById("tab-" + id)) {
      activateTab(id);
      return;
    }

    // Criar aba
    const tab = document.createElement("div");
    tab.className = "erp-tab active";
    tab.id = "tab-" + id;
    tab.dataset.id = id;
    tab.dataset.title = label;
    tab.innerHTML = `
      ${label}
      <span class="close">×</span>
    `;

    // Criar view
    const view = document.createElement("div");
    view.className = "erp-view active";
    view.id = "view-" + id;
    view.innerHTML = `<iframe src="${url}"></iframe>`;

    // Desativar outras
    document.querySelectorAll(".erp-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".erp-view").forEach(v => v.classList.remove("active"));

    tabs.appendChild(tab);
    views.appendChild(view);

    title.innerText = label;

    // Eventos
    tab.addEventListener("click", e => {
      if (e.target.classList.contains("close")) return;
      activateTab(id);
    });

    tab.querySelector(".close").addEventListener("click", e => {
      e.stopPropagation();
      closeTab(id);
    });
  }

  // Menu lateral
  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      menuLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      openTab(link.getAttribute("href"), link.innerText);
    });
  });

  // Aba inicial
  openTab("leitura.html", "🕒 Fila de Espera");
});
