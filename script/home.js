
function verificarLogin() {
    const usuarioAutenticado = localStorage.getItem('token');
    if (!usuarioAutenticado) {
        window.location.href = 'index.html';
    }
}
verificarLogin();

const acData = new Date();
const aDia = acData.getDay(); 
const aMes = acData.getMonth();
const aAno = acData.getFullYear();
const aHoras = acData.getHours();
const aMinuto = acData.getMinutes();
const aSegundo = acData.getSeconds();

const sobe_data =(aDia+"/"+aMes+"/"+aAno+" - "+aHoras+":"+aMinuto+":"+aSegundo)

const c_logout = document.createElement('a');
c_logout.id = 'logout-user'
c_logout.innerText = 'Sair'
    
const suser = document.querySelector('#show-savedata');
suser.innerHTML = 'Bem vindo, '+ex1.bold();
suser.appendChild(c_logout);

var hasUnsavedChanges = true;
document.getElementById('itemDate').value = new Date().toISOString().split('T')[0];

const DB_NAME = 'estoqueDB';
let db;
let currentEditId = null;
const databases = ['Lista 1', 'Lista 2', 'Lista 3'];
let currentDatabase = databases[0];
let allItems = [];

const openDatabase = () => {
    const request = indexedDB.open(DB_NAME, 2);
    request.onerror = () => console.error('Erro ao abrir o banco de dados');
    request.onsuccess = () => {
        db = request.result;
        loadItems();
    };
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        databases.forEach(name => {
            if (!db.objectStoreNames.contains(name)) {
                db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
            }
        });
    };
};

const initDatabase = () => {
    const select = document.getElementById('databaseSelect');
    databases.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
};

const changeDatabase = () => {
    currentDatabase = document.getElementById('databaseSelect').value;
    loadItems();
};

const addItem = () => {
    const itemName = document.getElementById('itemName').value.trim();
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);
    let itemDate = document.getElementById('itemDate').value;

    if (!itemName) {
        alert('O nome do item não pode estar vazio.');
        return;
    }
    if (isNaN(itemQuantity) || itemQuantity < 1) {
        alert('A quantidade deve ser maior que 0.');
        return;
    }

    if (!itemDate) {
        itemDate = new Date().toISOString().split('T')[0];
    }

    const newItem = { name: itemName, quantity: itemQuantity, date: itemDate };
    const transaction = db.transaction(currentDatabase, 'readwrite');
    const store = transaction.objectStore(currentDatabase);
    store.add(newItem);
    transaction.oncomplete = () => {
        loadItems();
        clearInputs();
    };

    hasUnsavedChanges = false;

    transaction.onerror = () => console.error('Erro ao adicionar item');
};

const loadItems = () => {
    const transaction = db.transaction(currentDatabase, 'readonly');
    const store = transaction.objectStore(currentDatabase);
    const request = store.getAll();
    request.onsuccess = (event) => {
        allItems = event.target.result;
        displayItems(allItems);
    };
    transaction.onerror = () => console.error('Erro ao carregar itens');
};

const displayItems = (items) => {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';
    items.forEach(item => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = item.date.split('-').reverse().join('/');
        const actionsCell = row.insertCell(3);

        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.onclick = () => updateQuantity(item.id, 1);
        actionsCell.appendChild(incrementButton);

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.onclick = () => updateQuantity(item.id, -1);
        actionsCell.appendChild(decrementButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editItem(item.id);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteItem(item.id);
        actionsCell.appendChild(deleteButton);
    });
};

const searchItems = () => {
    const searchValue = document.getElementById('itemName').value.toLowerCase();
    const filteredItems = allItems.filter(item => item.name.toLowerCase().includes(searchValue));
    displayItems(filteredItems);
};

const updateQuantity = (id, change) => {
    const transaction = db.transaction(currentDatabase, 'readwrite');
    const store = transaction.objectStore(currentDatabase);
    const request = store.get(id);
    request.onsuccess = (event) => {
        const item = event.target.result;
        item.quantity += change;
        if (item.quantity < 0) item.quantity = 0;
        store.put(item);
        transaction.oncomplete = () => loadItems();
    };
    transaction.onerror = () => console.error('Erro ao atualizar quantidade');
    hasUnsavedChanges = false;
};

const editItem = (id) => {
    const transaction = db.transaction(currentDatabase, 'readonly');
    const store = transaction.objectStore(currentDatabase);
    const request = store.get(id);
    request.onsuccess = (event) => {
        const item = event.target.result;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemQuantity').value = item.quantity;
        document.getElementById('itemDate').value = item.date;

        currentEditId = id;
        document.getElementById('saveButton').style.display = 'inline';
        document.getElementById('addButton').style.display = 'none';
    };
    transaction.onerror = () => console.error('Erro ao buscar item para edição');
};

const saveEdit = () => {
    const itemName = document.getElementById('itemName').value.trim();
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);
    const itemDate = document.getElementById('itemDate').value;

    const updatedItem = { id: currentEditId, name: itemName, quantity: itemQuantity, date: itemDate };
    const transaction = db.transaction(currentDatabase, 'readwrite');
    const store = transaction.objectStore(currentDatabase);
    store.put(updatedItem);
    transaction.oncomplete = () => {
        loadItems();
        clearInputs();
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('addButton').style.display = 'inline';
    };
    transaction.onerror = () => console.error('Erro ao salvar edição');
    hasUnsavedChanges = false;
};

const deleteItem = (id) => {
    const transaction = db.transaction(currentDatabase, 'readwrite');
    const store = transaction.objectStore(currentDatabase);
    store.delete(id);
    transaction.oncomplete = () => {
        loadItems();
    };
    transaction.onerror = () => console.error('Erro ao excluir item');
    hasUnsavedChanges = false;
};

const clearInputs = () => {
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemDate').value = '';
};

const exportToCSV = () => {


    const rows = document.querySelectorAll('#inventoryTable tr');
    const csvData = [];
    const headers = ['Nome', 'Quantidade', 'Data'];
    csvData.push(headers.join(','));

    rows.forEach((row, index) => {
        if (index === 0) return;
        const cols = row.querySelectorAll('td');
        const rowData = [];
        const name = cols[0].innerText;
        const quantity = parseInt(cols[1].innerText, 10);
        const date = cols[2].innerText;
        rowData.push(name, quantity, date);
        csvData.push(rowData.join(','));
    });

    const csvString = csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    hasUnsavedChanges = true;
};

const importCSV = () => {


    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Por favor, selecione um arquivo CSV.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const csvData = event.target.result;
        const rows = csvData.split('\n').slice(1);
        const items = [];

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length === 3) {
                const itemName = columns[0].trim();
                const itemQuantity = parseInt(columns[1].trim(), 10);
                const itemDate = columns[2].trim();
                
                if (itemName && !isNaN(itemQuantity)) {
                    items.push({ name: itemName, quantity: itemQuantity, date: itemDate });
                }
            }
        });

        const transaction = db.transaction(currentDatabase, 'readwrite');
        const store = transaction.objectStore(currentDatabase);
        items.forEach(item => store.add(item));

        transaction.oncomplete = () => {
            loadItems();
            alert('Importação concluída com sucesso!');
        };
        transaction.onerror = () => console.error('Erro ao importar itens');
    };

    reader.readAsText(file);
    hasUnsavedChanges = false;
};

document.getElementById('logout-user').addEventListener('click', function(){
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

window.addEventListener('beforeunload', (event) => {
    if (hasUnsavedChanges == false) {
        exportToCSV();
        hasUnsavedChanges = true;
    }
});




openDatabase();
initDatabase();
