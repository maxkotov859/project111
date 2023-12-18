const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const sizeFilterInput = document.getElementById('sizeFilter');
const typeFilterInput = document.getElementById('typeFilter');

// Обработчик перетаскивания файлов
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '#f0f0f0';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.backgroundColor = '';
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '';

  const files = e.dataTransfer.files;
  handleFiles(files);
});

// Обработчик выбора файлов через input
fileInput.addEventListener('change', (e) => {
  const files = e.target.files;
  handleFiles(files);
});

// Обработка полученных файлов
function handleFiles(files) {
  for (const file of files) {
    const listItem = document.createElement('div');
    listItem.innerHTML = `
      <strong>Название:</strong> ${file.name}<br>
      <strong>Тип:</strong> ${file.type || 'неизвестный тип'}<br>
      <strong>Вес:</strong> ${file.size} байт
    `;
    fileList.appendChild(listItem);

    // Сохранение файлов в localStorage
    const reader = new FileReader();
    reader.onload = function(event) {
      localStorage.setItem(file.name, event.target.result);
    };
    reader.readAsDataURL(file);
  }
}

// Фильтрация файлов по размеру и типу
sizeFilterInput.addEventListener('input', () => {
  const sizeFilter = parseInt(sizeFilterInput.value);
  const fileItems = fileList.querySelectorAll('div');
  fileItems.forEach((item) => {
    const fileSize = parseInt(item.innerText.match(/Вес: (\d+) байт/)[1]);
    if (fileSize > sizeFilter || isNaN(sizeFilter)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

typeFilterInput.addEventListener('input', () => {
  const typeFilter = typeFilterInput.value.toLowerCase();
  const fileItems = fileList.querySelectorAll('div');
  fileItems.forEach((item) => {
    const fileType = item.innerText.match(/Тип: (.+)/)[1].toLowerCase();
    if (fileType.includes(typeFilter) || typeFilter === '') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
