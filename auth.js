// auth.js — controle central de autenticação

(function () {
  const logado = localStorage.getItem("logado");

  if (logado !== "true") {
    // salva a página que o usuário tentou acessar
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = "login.html";
  }
})();
