document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu-link");
  const frame = document.getElementById("erp-frame");
  const title = document.getElementById("page-title");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // Ativo visual
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Atualiza iframe
      frame.src = link.getAttribute("href");

      // Atualiza título
      title.innerText = link.innerText;
    });
  });
});
