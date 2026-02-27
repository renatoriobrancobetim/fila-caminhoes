// components/authGuard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey:"AIzaSyCKdfOvWehaJcuK6uX5JXxc7YdN26h8sXY",
  authDomain:"tabela-frete-rio-branco.firebaseapp.com",
  projectId:"tabela-frete-rio-branco"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function protegerPagina(config){

  onAuthStateChanged(auth, async (user)=>{

    if(config.precisaLogin && !user){
      window.location.href="login.html";
      return;
    }

    if(!user) return;

    const snap = await getDoc(doc(db,"usuarios",user.uid));

    if(!snap.exists()){
      window.location.href="painel.html";
      return;
    }

    const dados = snap.data();

    // 🔴 Verificação por nível mínimo
    if(config.nivelMinimo && dados.nivel < config.nivelMinimo){
      window.location.href="painel.html";
      return;
    }

    // 🟡 Verificação por menu específico
    if(config.menu){
      if(dados.nivel !== 4 && !dados.menus?.[config.menu]){
        window.location.href="painel.html";
        return;
      }
    }

    // 🔵 Se passou por tudo
    if(config.onAutorizado){
      config.onAutorizado(dados);
    }

  });

}
