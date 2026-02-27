// components/security.js

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

onAuthStateChanged(auth, async (user)=>{

  if(!user){
    window.location.href="login.html";
    return;
  }

  const snap = await getDoc(doc(db,"usuarios",user.uid));

  if(!snap.exists()){
    window.location.href="painel.html";
    return;
  }

  const dados = snap.data();

  const requiredMenu = document.body.dataset.menu;
  const requiredNivel = document.body.dataset.nivel;

  // 🔴 Verificação por nível
  if(requiredNivel){
    if(dados.nivel < parseInt(requiredNivel)){
      window.location.href="painel.html";
      return;
    }
  }

  // 🟡 Verificação por menu
  if(requiredMenu){
    if(dados.nivel !== 4 && !dados.menus?.[requiredMenu]){
      window.location.href="painel.html";
      return;
    }
  }

});
