function updateTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
  
    const storedData = /* код для чтения данных из хранилища */;
  
    if (!storedData || storedData.length === 0) {
      // Если данных нет, создать tr с emptyHeader
      const emptyRow = document.createElement('tr');
      const emptyHeaderCell = document.createElement('td');
      emptyHeaderCell.textContent = 'emptyHeader';
      emptyRow.appendChild(emptyHeaderCell);
      tableBody.appendChild(emptyRow);
    } else {
      // Если есть данные, заполнить таблицу
      storedData.forEach(item => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name; 
        row.appendChild(nameCell);
  
        const valueCell = document.createElement('td');
        valueCell.textContent = item.value; 
        row.appendChild(valueCell);
  
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'X';
        deleteButton.onclick = function() {
          deleteItem(item.key); 
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
  
        tableBody.appendChild(row);
      });
    }
  }
  


  
  window.onload = function() {
    updateTable();
  };

  
  let currentStorage = null; 

function getStorage() {
  currentStorage = localStorage; 
  updateTable();
}


function saveItem(key, value) {
    currentStorage.setItem(key, value);
    updateTable();
  }

  
  function deleteItem(key) {
    const confirmation = confirm("Вы уверены, что хотите удалить эту запись?");
  
    if (confirmation) {
      currentStorage.removeItem(key);
      updateTable();
    }
  }

  
  function clearStorage() {
    const confirmation = confirm("Вы уверены, что хотите полностью очистить локальное хранилище?");
    if (confirmation) {
      currentStorage.clear();
      updateTable();
    }
  }
  