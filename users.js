// users.js — base de usuários do sistema

const USERS = {
  renato: {
    senha: "renato",
    nome: "Renato",
    perfil: "admin"
  },
  comercial: {
    senha: "Rio2026@",
    nome: "Comercial",
    perfil: "operador"
  },
  consulta: {
    senha: "1234",
    nome: "Consulta",
    perfil: "leitura"
  }
};

/*
Perfis disponíveis:
- admin     → acesso total
- operador  → operação (fila, chamadas)
- leitura   → apenas visualização
*/
