var dbTable = document.querySelector('.db-table');

dbTable.addEventListener('click', function (event) {
  var target = event.target,
    parent = target.parentNode,
    cellArr = [],
    filteredArr = [],
    i = 0,
    docFrag,
    input,
    td,
    node,
    btn;

  if (parent.className !== 'record') {
    return;
  }

  if (target.className === 'record-edit-field') {
    console.log('edit mode');
    return;
  }

  console.log(parent);

  cellArr = Array.prototype.slice.call(parent.querySelectorAll('td'));
  for (i = 0; i < cellArr.length; i++) {
    node = cellArr[i];
    
    if (node.children.length === 0) {
      filteredArr.push(node.textContent);
    } 
  }

  parent.classList.toggle('record-edit');
  btn = parent.querySelector('.record-update');
  btn.classList.toggle('hidden');
  btn = btn.parentNode;

  docFrag = document.createDocumentFragment();
  for (i = 0; i < filteredArr.length; i++) {
    input = document.createElement('input');
    td = document.createElement('td');    
    input.value = filteredArr[i];
    input.className = 'record-edit-field';
    td.appendChild(input);
    docFrag.appendChild(td);
  }  
  docFrag.appendChild(btn);

  parent.innerHTML = '';
  parent.appendChild(docFrag);
}, false);