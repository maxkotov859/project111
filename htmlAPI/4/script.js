
  let db;

  // Открываем соединение с базой данных
  const request = indexedDB.open("myDatabase", 1);

  // Событие "onupgradeneeded"
  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("tableName")) {
      db.createObjectStore("tableName", { keyPath: "id", autoIncrement:true });
    }
  };

  // Событие "onsuccess"
  request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Успешное соединение с базой данных");
    // Здесь можно произвести дальнейшие действия с базой данных
  };

  // Событие "onerror"
  request.onerror = function(event) {
    console.error("Ошибка соединения с базой данных:", event.target.errorCode);
  };




function updateTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу перед обновлением
  
    const transaction = db.transaction(['tableName'], 'readonly');
    const objectStore = transaction.objectStore('tableName');
  
    objectStore.openCursor().onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cursor.value.id}</td>
          <td contenteditable="true">${cursor.value.name}</td>
          <td contenteditable="true">${cursor.value.email}</td>
          <td>
            <span class='action' onclick='updateItem(${cursor.value.id})'>Изменить</span>
          </td>
          <td>
            <span class='action' onclick='deleteItem(${cursor.value.id})'>Удалить</span>
          </td>
        `;
        tableBody.appendChild(row);
        cursor.continue();
      }
    };
  }
  

  function saveItem() {
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
  
    const transaction = db.transaction(['tableName'], 'readwrite');
    const objectStore = transaction.objectStore('tableName');
  
    const newItem = { name: newName, email: newEmail };
  
    const request = objectStore.add(newItem);
  
    request.onsuccess = function() {
      console.log('Новая запись успешно добавлена в базу данных.');
      updateTable(); // Обновляем таблицу после добавления записи
    };
  
    request.onerror = function() {
      console.error('Ошибка при добавлении записи.');
    };
  }

  
  function updateItem(key) {
    const transaction = db.transaction(['tableName'], 'readwrite');
    const objectStore = transaction.objectStore('tableName');
  
    const request = objectStore.get(key);
  
    request.onsuccess = function(event) {
      const item = request.result;
      if (item) {
        const updatedName = prompt('Введите новое имя:', item.name);
        const updatedEmail = prompt('Введите новую электронную почту:', item.email);
  
        item.name = updatedName;
        item.email = updatedEmail;
  
        const updateRequest = objectStore.put(item);
  
        updateRequest.onsuccess = function() {
          console.log('Запись успешно обновлена в базе данных.');
          updateTable(); // Обновляем таблицу после изменения записи
        };
  
        updateRequest.onerror = function() {
          console.error('Ошибка при обновлении записи.');
        };
      } else {
        console.error('Запись не найдена в базе данных.');
      }
    };
  
    request.onerror = function() {
      console.error('Ошибка при получении записи для обновления.');
    };
  }

  

  function deleteItem(key) {
    const transaction = db.transaction(['tableName'], 'readwrite');
    const objectStore = transaction.objectStore('tableName');
  
    const request = objectStore.delete(key);
  
    request.onsuccess = function() {
      console.log('Запись успешно удалена из базы данных.');
      updateTable(); // Обновляем таблицу после удаления записи
    };
  
    request.onerror = function() {
      console.error('Ошибка при удалении записи.');
    };
  }
  