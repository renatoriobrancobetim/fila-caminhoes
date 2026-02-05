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
  "painel.html": ["admin", "operador", "leitura", "comercial"],

  "frete.html": ["admin", "comercial"],

  "clientes-mapa.html": ["admin", "comercial"],

  "leitura.html": ["admin", "comercial", "leitura"],

  "index.html": ["admin", "operador"],

  "motoristas.html": ["admin", "operador"],

  "cadastro.html": ["admin"]
};


  const pagina = location.pathname.split("/").pop();

  if (regras[pagina] && !regras[pagina].includes(perfil)) {
    alert("⛔ Você não tem permissão para acessar esta página.");
    location.href = "painel.html";
  }
})();
