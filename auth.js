// auth.js — controle central de autenticação e permissão

(function () {
  const logado = localStorage.getItem("logado");
  const perfil = localStorage.getItem("perfil");

  if (logado !== "true") {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    location.href = "login.html";
    return;
  }

  // 🔐 REGRAS POR PÁGINA
  const regras = {
    "index.html":   ["admin"],
    "motoristas.html":   ["admin"],
    "frete.html":   ["admin", "comercial", "leitura"],
    "cadastro.html":["admin"],
    "painel.html":  ["admin", "comercial", "leitura"],
    "leitura.html": ["admin", "comercial", "leitura"],
    "clientes-mapa.html": ["admin", "comercial", "leitura"],
  };

  const pagina = location.pathname.split("/").pop();

  if (regras[pagina] && !regras[pagina].includes(perfil)) {
    alert("⛔ Você não tem permissão para acessar esta página.");
    location.href = "painel.html";
  }
})();
