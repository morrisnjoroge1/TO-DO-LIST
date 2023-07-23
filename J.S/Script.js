const form = document.querySelector('form');
const input = form.querySelector('input');
const ul = document.querySelector('.list');
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
  
      span.textContent = item;
      button.textContent = 'Delete';
  
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    });
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();

  if (text !== '') {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.textContent = text;
    button.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    items.push(text);
    saveToLocalStorage();

    input.value = '';
  }
});

ul.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentNode.remove();
  }
});


//enable delete and add//
