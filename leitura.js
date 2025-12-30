import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, query,
  orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const filaRef = query(
  collection(db, "fila"),
  orderBy("criadoEm")
);

const tbody = document.getElementById("fila");

onSnapshot(filaRef, snapshot => {
  tbody.innerHTML = "";
  let ordem = 1;

  snapshot.forEach(doc => {
    const d = doc.data();
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${ordem++}</td>
      <td>${d.placa}</td>
      <td>${d.compartimento}</td>
      <td>${d.hora}</td>
    `;

    tbody.appendChild(tr);
  });
});
