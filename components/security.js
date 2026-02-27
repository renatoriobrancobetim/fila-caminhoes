// components/security.js

import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

  if(requiredNivel && dados.nivel < parseInt(requiredNivel)){
    window.location.href="painel.html";
    return;
  }

  if(requiredMenu){
    if(dados.nivel !== 4 && !dados.menus?.[requiredMenu]){
      window.location.href="painel.html";
      return;
    }
  }

});
