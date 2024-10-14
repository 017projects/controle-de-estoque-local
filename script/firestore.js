// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; //para firestore
//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyC5B4Hkp2Uca5OXYvWBOtsNGpEluHrErZQ",
      authDomain: "controle-de-estoque-ga.firebaseapp.com",
      projectId: "controle-de-estoque-ga",
      storageBucket: "controle-de-estoque-ga.appspot.com",
      messagingSenderId: "680589320141",
      appId: "1:680589320141:web:a9b66e8796aeb530fdae84"
    };
  
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db1 = getFirestore(app); // Inicializando Firestore



    

const clearCollection = async (collectionName) => {
const collectionRef = collection(db1, ex1+", Lista 1");
const querySnapshot = await getDocs(collectionRef);
    
const deletePromises = [];
    querySnapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(docSnapshot.ref));
    });

    await Promise.all(deletePromises);
    console.log(`Coleção ${collectionName} limpa com sucesso!`);
    };

const clearCollection2 = async (collectionName) => {
const collectionRef = collection(db1, ex1+", Lista 2");
const querySnapshot = await getDocs(collectionRef);
    
const deletePromises = [];
    querySnapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(docSnapshot.ref));
    });

    await Promise.all(deletePromises);
    console.log(`Coleção ${collectionName} limpa com sucesso!`);
    };

const clearCollection3 = async (collectionName) => {
const collectionRef = collection(db1, ex1+", Lista 3");
const querySnapshot = await getDocs(collectionRef);
    
const deletePromises = [];
    querySnapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(docSnapshot.ref));
    });

    await Promise.all(deletePromises);
    console.log(`Coleção ${collectionName} limpa com sucesso!`);
    };


    // Função para enviar dados ao Firestore

const sendDataToFirestore = async (data) => {
    try {
        for (const item of data) {
            // Verifique se `item` é um objeto antes de enviar
            if (typeof item === 'object' && item !== null) {
                await addDoc(collection(db1, ex1+", Lista 1"), item);
                console.log("Documento adicionado:", item);
            } else {
                console.error("Dados inválidos:", item);
            }
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
    }
};

const sendDataToFirestore2 = async (data) => {
    try {
        for (const item of data) {
            // Verifique se `item` é um objeto antes de enviar
            if (typeof item === 'object' && item !== null) {
                await addDoc(collection(db1, ex1+", Lista 2"), item);
                console.log("Documento adicionado:", item);
            } else {
                console.error("Dados inválidos:", item);
            }
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
    }
};

const sendDataToFirestore3 = async (data) => {
    try {
        for (const item of data) {
            // Verifique se `item` é um objeto antes de enviar
            if (typeof item === 'object' && item !== null) {
                await addDoc(collection(db1, ex1+", Lista 3"), item);
                console.log("Documento adicionado:", item);
            } else {
                console.error("Dados inválidos:", item);
            }
        }
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
    }
};




// Configurando o evento de clique no botão
document.getElementById('sendDataButton').addEventListener('click', function() {

    

var objectStore = db.transaction('Lista 1').objectStore('Lista 1');

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { id: cursor.key, nome: cursor.value.name, quantidade: cursor.value.quantity, data_produto: cursor.value.date, ip: ipAddressv6}
    ]
    const executeop = async () =>{
        await clearCollection(ex1+", Lista 1");
        await sendDataToFirestore(jsonArray1)
    }
        
    cursor.continue();
    executeop();
    console.log(jsonArray1);
    console.log(currentDatabase);

  }
  else {
        alert("Erro ao enviar lista 3!");
  }
}

var objectStore2 = db.transaction('Lista 2').objectStore('Lista 2');

objectStore2.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { id: cursor.key, nome: cursor.value.name, quantidade: cursor.value.quantity, data_produto: cursor.value.date, ip: ipAddressv6}
    ]
    const executeop = async () =>{
        await clearCollection2(ex1+", Lista 2");
        await sendDataToFirestore2(jsonArray1)
    }
        
    cursor.continue();
    executeop();
    console.log(jsonArray1);
    console.log(currentDatabase);

  }
  else {
        alert("Dados salvos com sucesso!");
  }
}


var objectStore3 = db.transaction('Lista 3').objectStore('Lista 3');

objectStore3.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { id: cursor.key, nome: cursor.value.name, quantidade: cursor.value.quantity, data_produto: cursor.value.date, ip: ipAddressv6}
    ]
    const executeop = async () =>{
        await clearCollection3(ex1+", Lista 3");
        await sendDataToFirestore3(jsonArray1)
    }
        
    cursor.continue();
    executeop();
    console.log(jsonArray1);
    console.log(currentDatabase);

  }
  else {
        alert("Dados salvos com sucesso!");
  }
}







}); 


