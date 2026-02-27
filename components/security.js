import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let authInicializado = false;

onAuthStateChanged(auth, async (user)=>{

  // 🔥 ignora primeira execução até restaurar sessão
  if (!authInicializado) {
    authInicializado = true;
    return;
  }

  if (!user) {
    window.location.replace("login.html");
    return;
  }

  try {
    const snap = await getDoc(doc(db,"usuarios",user.uid));

    if (!snap.exists()) {
      window.location.replace("painel.html");
      return;
    }

    const dados = snap.data();

    const requiredMenu = document.body.dataset.menu;
    const requiredNivel = document.body.dataset.nivel;

    if (requiredNivel && dados.nivel < parseInt(requiredNivel)) {
      window.location.replace("painel.html");
      return;
    }

    if (requiredMenu) {
      if (dados.nivel !== 4 && !dados.menus?.[requiredMenu]) {
        window.location.replace("painel.html");
        return;
      }
    }

  } catch (e) {
    console.error("Erro segurança:", e);
    window.location.replace("login.html");
  }

});
