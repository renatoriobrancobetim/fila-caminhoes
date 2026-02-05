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
    "index.html":   ["admin", "operador"],
    "frete.html":   ["admin"],
    "cadastro.html":["admin"],
    "painel.html":  ["admin", "operador", "leitura"],
    "leitura.html": ["admin", "operador", "leitura"],
    "clientes-mapa.html": ["admin", "operador"]
  };

  const pagina = location.pathname.split("/").pop();

  if (regras[pagina] && !regras[pagina].includes(perfil)) {
    alert("⛔ Você não tem permissão para acessar esta página.");
    location.href = "painel.html";
  }
})();
