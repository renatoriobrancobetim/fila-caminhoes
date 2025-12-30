import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc,
  getDocs, query, orderBy, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const filaRef = collection(db, "fila");

export async function adicionar() {
  const placa = document.getElementById("placa").value;
  const compartimento = document.getElementById("compartimento").value;

  await addDoc(filaRef, {
    placa,
    compartimento,
    data: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    criadoEm: new Date()
  });

  alert("Adicionado à fila");
}

export async function chamar() {
  const q = query(filaRef, orderBy("criadoEm"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    alert("Fila vazia");
    return;
  }

  const primeiro = snapshot.docs[0];
  await deleteDoc(doc(db, "fila", primeiro.id));

  alert(`Chamado: ${primeiro.data().placa}`);
}

window.adicionar = adicionar;
window.chamar = chamar;
