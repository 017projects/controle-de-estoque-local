// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; //para firestore
//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration

var defaultUpdateTime = 1800000;

if(ex1 === "Gabriele Avila"){
    defaultUpdateTime = 10000
}


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
        alert("Erro ao enviar dados:", error);
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
        alert("Erro ao enviar dados:", error);
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
        alert("Erro ao enviar dados:", error);
    }
};




// Configurando o evento de clique no botão
document.getElementById('sendDataButton').addEventListener('click', function() {

const c_div_alert  = document.createElement('div');
c_div_alert.id = 'div_alert_pass'

const b_div_alert  = document.createElement('div');
b_div_alert.id = 'b_div_alert_pass'

const c_div_alert_ok = document.createElement('button')
c_div_alert_ok.id = 'btn_ok_alert'

const footer = document.createElement('footer')
footer.innerHTML = '<p><a href="https://linktr.ee/017_us" target="_blank">Alexandre Miranda</a>&ensp;©Todos os direitos reservados</p>'

var objectStore = db.transaction(ex1+', Lista 1').objectStore(ex1+', Lista 1');

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        {
        id: cursor.key,
        name: cursor.value.name,
        quantity: cursor.value.quantity,
        date: cursor.value.date,
        ipV6: ipAddressv6,
        ipv4: ipAddressv4,
        horario_envio: sobe_data}
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
        console.log("Lista 1 salva com sucesso!");
        document.querySelector('body').removeChild(document.querySelector('footer'));
        document.querySelector('#show-savedata').parentNode.insertBefore(c_div_alert, document.querySelector('h1'));
        document.getElementById('div_alert_pass').appendChild(b_div_alert);
        b_div_alert.innerHTML = '<p>Todas as listas foram enviadas com sucesso! <br>Se houver necessidade de recuperação, <a href="https://linktr.ee/017_us" target="_blank"> contatar o dev </a></p>';
        b_div_alert.appendChild(c_div_alert_ok);
        c_div_alert_ok.innerText = 'Ok'
        document.getElementById('btn_ok_alert').addEventListener('click', function(){
            document.querySelector('body').removeChild(c_div_alert);
            document.querySelector('body').appendChild(footer)
        })

  }
}

var objectStore2 = db.transaction(ex1+', Lista 2').objectStore(ex1+', Lista 2');

objectStore2.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { 
            id: cursor.key,
            name: cursor.value.name,
            quantity: cursor.value.quantity,
            date: cursor.value.date,
            ipV6: ipAddressv6,
            ipv4: ipAddressv4,
            horario_envio: sobe_data}
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
        console.log("Lista 2 salva com sucesso!");
  }
}


var objectStore3 = db.transaction(ex1+', Lista 3').objectStore(ex1+', Lista 3');

objectStore3.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { 
            id: cursor.key,
            name: cursor.value.name,
            quantity: cursor.value.quantity,
            date: cursor.value.date,
            ipV6: ipAddressv6,
            ipv4: ipAddressv4,
            horario_envio: sobe_data}
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
        console.log("Lista 3 salva com sucesso!");
  }
}


});

setInterval(() => {
    var objectStore = db.transaction(ex1+', Lista 1').objectStore(ex1+', Lista 1');

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        {
            id: cursor.key,
            name: cursor.value.name,
            quantity: cursor.value.quantity,
            date: cursor.value.date,
            ipV6: ipAddressv6,
            ipv4: ipAddressv4,
            horario_envio: sobe_data
        }
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
        document.getElementById('show-savedata').innerHTML = 'Dados salvos automaticamente com sucesso! :)';

        setTimeout(() => {
            suser.innerHTML = 'Bem vindo, '+ex1.bold();
            suser.appendChild(c_logout);
        }, 3000);
  }
}


var objectStore2 = db.transaction(ex1+', Lista 2').objectStore(ex1+', Lista 2');

objectStore2.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { 
            id: cursor.key,
            name: cursor.value.name,
            quantity: cursor.value.quantity,
            date: cursor.value.date,
            ipV6: ipAddressv6,
            ipv4: ipAddressv4,
            horario_envio: sobe_data}
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
        console.log("Lista 2 salva com sucesso!");
  }
}


var objectStore3 = db.transaction(ex1+', Lista 3').objectStore(ex1+', Lista 3');

objectStore3.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    const jsonArray1 = [
        { 
            id: cursor.key,
            name: cursor.value.name,
            quantity: cursor.value.quantity,
            date: cursor.value.date,
            ipV6: ipAddressv6,
            ipv4: ipAddressv4,
            horario_envio: sobe_data}
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
        console.log("Lista 3 salva com sucesso!");
  }
}



}, defaultUpdateTime);


//------------------------importação-----------------------//

const importDataFromFirestore = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db1, collectionName));
        
        const dataToImport = querySnapshot.docs.map(doc => ({
            id: doc.id, // Use o ID do documento
            ...doc.data()
        }));

        console.log("Dados a serem importados da coleção:", collectionName, dataToImport);

        const transaction = db.transaction(collectionName, 'readwrite');
        const objectStore = transaction.objectStore(collectionName);
        
        dataToImport.forEach(item => {
            const request = objectStore.put(item);
            request.onsuccess = () => {
                console.log(`Documento ${item.id} importado com sucesso para o IndexedDB!`);
                alert('Dados importados com sucesso!')
            };
            request.onerror = (event) => {
                console.error(`Erro ao importar o documento ${item.id}:`, event.target.error);
                alert('Erro ao importar dados');
            };
        });

        transaction.oncomplete = () => {
            console.log(`Transação concluída para a coleção ${collectionName}.`);
            loadItems(); // Carrega e exibe os itens após a importação
        };

    } catch (error) {
        console.error("Erro ao importar dados do Firestore:", error);
        alert('Falha na importação do Firestore', error);
    }
};

// Configurando o evento de clique no botão de importação
document.getElementById('importDataButton').addEventListener('click', function() {
    const collections = ["Lista 1", "Lista 2", "Lista 3"];
    collections.forEach(collectionName => {
        importDataFromFirestore(`${ex1}, ${collectionName}`);
    });
});
