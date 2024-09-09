function verificarLogin() {
    const usuarioAutenticado = localStorage.getItem('token');
    if (!usuarioAutenticado) {
        window.location.href = 'index.html';
    }
}

verificarLogin();

var hasUnsavedChanges = true;
        document.getElementById('itemDate').value = new Date().toISOString().split('T')[0]; // Define a data atual

        const DB_NAME = 'estoqueDB';
        const STORE_NAME = 'itens';
        let db;
        let allItems = []; 
        let currentEditId = null; // Variable to store the ID of the item being edited

        const openDatabase = () => {
            const request = indexedDB.open(DB_NAME, 1);
            request.onerror = () => console.error('Erro ao abrir o banco de dados');
            request.onsuccess = () => {
                db = request.result;
                loadItems();
            };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            };
        };

        const addItem = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Define a data atual
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);
    let itemDate = document.getElementById('itemDate').value;


    // Verifica se a data está vazia e define como a data atual se necessário
    if (itemName === '') {
                alert('O nome do item não pode estar vazio.');
                return;
            }
            if (isNaN(itemQuantity)) {
                alert('A quantidade deve ser maior que 1.');
                return;
            }
            if(itemDate > currentDate){
                alert('A data não pode ser superior a data');
                return;
            }

    if (!itemDate) {
        itemDate = new Date().toISOString().split('T')[0]; // Define a data atual
    }


    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
        const items = event.target.result;
        const isDuplicate = items.some(item => item.name === itemName);

        if (isDuplicate) {
            alert('Este item já existe na base de dados');
            return;
        }

        const newItem = { name: itemName, quantity: itemQuantity, date: itemDate };
        const addTransaction = db.transaction(STORE_NAME, 'readwrite');
        const addStore = addTransaction.objectStore(STORE_NAME);
        addStore.add(newItem);
        addTransaction.oncomplete = () => {
            loadItems();
            clearInputs();
        };

        hasUnsavedChanges = false;
        addTransaction.onerror = () => console.error('Erro ao adicionar item');
    };

    transaction.onerror = () => console.error('Erro ao buscar itens');
};

const loadItems = () => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = (event) => {
        const items = event.target.result;
        const tbody = document.querySelector('#inventoryTable tbody');
        tbody.innerHTML = '';
        items.forEach(item => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = item.quantity;
            row.insertCell(2).textContent = item.date.split('-').reverse().join('/');

            // Botões de Ação
            const actionsCell = row.insertCell(3);
            
            // Botão para Aumentar Quantidade
            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.onclick = () => updateQuantity(item.id, 1); // Aumenta a quantidade
            actionsCell.appendChild(incrementButton);

            // Botão para Diminuir Quantidade
            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.onclick = () => updateQuantity(item.id, -1); // Diminui a quantidade
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
        allItems = event.target.result; // Armazena todos os itens
        displayItems(allItems); // Exibe todos os itens inicialmente
    };
};

const updateQuantity = (id, change) => {
    hasUnsavedChanges = false;

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = (event) => {
        const item = event.target.result;
        item.quantity += change; // Atualiza a quantidade
        store.put(item); // Salva a nova quantidade
        transaction.oncomplete = () => {
            loadItems(); // Recarrega os itens para mostrar a nova quantidade
        };
    };
    transaction.onerror = () => console.error('Erro ao atualizar quantidade');
};
        const editItem = (id) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);
            request.onsuccess = (event) => {
                const item = event.target.result;
                document.getElementById('itemName').value = item.name;
                document.getElementById('itemQuantity').value = item.quantity;
                document.getElementById('itemDate').value = item.date;
                if (!document.getElementById('itemDate').value) {
                    document.getElementById('itemDate').value = new Date().toISOString().split('T')[0]; // Define a data atual
                }

                currentEditId = id; // Store the ID of the item being edited
                document.getElementById('saveButton').style.display = 'inline'; // Show the save button
                document.getElementById('addButton').style.display = 'none';
            };
        };

        const saveEdit = () => {

            const itemName = document.getElementById('itemName').value;
            const itemQuantity = parseInt(document.getElementById('itemQuantity').value, 10);
            const itemDate = new Date().toISOString().split('T')[0];;

            const updatedItem = { id: currentEditId, name: itemName, quantity: itemQuantity, date: itemDate };
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            store.put(updatedItem); // Use put to update the item
            transaction.oncomplete = () => {
                loadItems();
                clearInputs();
                document.getElementById('saveButton').style.display = 'none'; // Hide the save button
                currentEditId = null; // Reset the edit ID
            };
            transaction.onerror = () => console.error('Erro ao salvar edição');

            document.getElementById('addButton').style.display = 'inline';
        };

        const deleteItem = (id) => {
            hasUnsavedChanges = false

            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            store.delete(id);
            transaction.oncomplete = () => {
                loadItems();
            };
            transaction.onerror = () => console.error('Erro ao excluir item');
        };

        const clearInputs = () => {
            document.getElementById('itemName').value = '';
            document.getElementById('itemQuantity').value = '';
            document.getElementById('itemDate').value = '';
        };

        const searchItem = () => {
            const searchValue = document.getElementById('itemName').value.toLowerCase();
            const filteredItems = allItems.filter(item => item.name.toLowerCase().includes(searchValue));
            
            displayItems(filteredItems);
            
            // Mensagem se nenhum item for encontrado
            const messageElement = document.getElementById('message');
            if (filteredItems.length === 0) {
                messageElement.textContent = 'Nenhum item encontrado.';
            } else {
                messageElement.textContent = '';
            }
        };

        const displayItems = (items) => {
            const tableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os itens filtrados
            items.forEach(item => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = item.name;
                row.insertCell(1).textContent = item.quantity;
                row.insertCell(2).textContent = item.date.split('-').reverse().join('/');
                const actionsCell = row.insertCell(3);
                // Botão para Aumentar Quantidade
            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.onclick = () => updateQuantity(item.id, 1); // Aumenta a quantidade
            actionsCell.appendChild(incrementButton);

            // Botão para Diminuir Quantidade
            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.onclick = () => updateQuantity(item.id, -1); // Diminui a quantidade
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

        
        openDatabase();

    document.getElementById('exportBtn').addEventListener('click', exportToCSV);

    function exportToCSV() {
    hasUnsavedChanges = true;

    const rows = document.querySelectorAll('#inventoryTable tr');
    const csvData = [];
    
    // Adiciona cabeçalhos
    const headers = ['Nome', 'Quantidade', 'Data'];
    csvData.push(headers.join(','));

    rows.forEach((row, index) => {
        if (index === 0) return; // Ignora a linha de cabeçalho da tabela
        const cols = row.querySelectorAll('td');
        const rowData = [];
        
        // Formata os dados
        const name = cols[0].innerText;
        const quantity = parseInt(cols[1].innerText, 10); // Converte para número
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
}

const importCSV = () => {
    hasUnsavedChanges = false
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Por favor, selecione um arquivo CSV.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const csvData = event.target.result;
        const rows = csvData.split('\n').slice(1); // Ignora o cabeçalho
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

        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        items.forEach(item => store.add(item));

        transaction.oncomplete = () => {
            loadItems();
            alert('Importação concluída com sucesso!');
        };
        transaction.onerror = () => console.error('Erro ao importar itens');
    };

    reader.readAsText(file);
};

const logout = document.getElementById('logout-user').addEventListener('click', function(){
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});


window.addEventListener('beforeunload', (event) => {
    if (hasUnsavedChanges == false) {
        exportToCSV();
        hasUnsavedChanges == true;
        localStorage.removeItem('token'); // Remove o token
        }
});


