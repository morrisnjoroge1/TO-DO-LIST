const form = document.querySelector('form');
const input = form.querySelector('input');
const ul = document.querySelector('.list');
const sortByNameButton = document.querySelector('.sort-by-name');
const sortByDateButton = document.querySelector('.sort-by-date');
let items = [];

function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function getFromLocalStorage() {
  const itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  if (itemsFromStorage !== null) {
    items = itemsFromStorage;
    items.forEach(item => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      const button = document.createElement('button');
      const editButton = document.createElement('button');
  
      span.textContent = item;
      button.textContent = 'Delete';
      editButton.textContent = 'Edit';

      li.appendChild(span);
      li.appendChild(editButton);
      li.appendChild(button);
      ul.appendChild(li);
    });
  }
}

function sortItemsByName() {
  items.sort();
  saveToLocalStorage();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  getFromLocalStorage();
}

function sortItemsByDate() {
  items.reverse();
  saveToLocalStorage();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  getFromLocalStorage();
}

function editItem(li, span, index) {
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.value = span.textContent;
  li.replaceChild(newInput, span);
  newInput.focus();

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  li.appendChild(saveButton);

  saveButton.addEventListener('click', () => {
    const newSpan = document.createElement('span');
    newSpan.textContent = newInput.value;
    li.replaceChild(newSpan, newInput);
    li.removeChild(saveButton);
    items[index] = newInput.value;
    saveToLocalStorage();
  });

  newInput.addEventListener('blur', () => {
    li.replaceChild(span, newInput);
    li.removeChild(saveButton);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();

  if (text !== '') {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    const editButton = document.createElement('button');

    span.textContent = text;
    button.textContent = 'Delete';
    editButton.textContent = 'Edit';

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(button);
    ul.appendChild(li);

    items.push(text);
    saveToLocalStorage();

    input.value = '';
  }
});

ul.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    const span = li.querySelector('span');
    const index = items.indexOf(span.textContent);

    if (e.target.textContent === 'Delete') {
      items.splice(index, 1);
      saveToLocalStorage();
      li.remove();
    } else if (e.target.textContent === 'Edit') {
      editItem(li, span, index);
    }
  }
});

sortByNameButton.addEventListener('click', sortItemsByName);
sortByDateButton.addEventListener('click', sortItemsByDate);

getFromLocalStorage();
