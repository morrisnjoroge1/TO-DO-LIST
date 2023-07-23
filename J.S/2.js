//local storage//

const form=document.querySelector('form');
const input=form.querySelector('input');
const ul=document.querySelector('.list');
let items=[];

function SaveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function getFromLocalStorage(){
  const itemsFromStorage =JSON.parse(localStorage.getItem('items'));
  if (itemsFromStorage !==null){
    items=itemsFromStorage;
    items.forEach(item =>{
      const li =document.createElement('li');
      const span =document.createElement('span');
      const button =document.createElement('button');

      span.textContent = item.name;
      button.textContent = 'Delete';

      li.appendChild(span);
      li.appendChild(button);
      li.appendChild(li);
    });
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  
  if (text !==''){
    const li =document.createElement('li');
    const span =document.createElement('span');
    const button =document.createElement('button');

    span.textContent=text;
    button.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    items.push(text);
    SaveToLocalStorage();

    input.value ='';
  }
});

ul.addEventListener('click', e =>{
  if (e.target.tagName == 'BUTTON') {
    const li = e.target.parentNode;
    const span = li.querySelector('span');
    const index = items.indexOf(span.textContent);

    items.splice(index, 1);
    SaveToLocalStorage();

    li.remove();
  }
})

getFromLocalStorage