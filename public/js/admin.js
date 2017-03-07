var dbTable = document.querySelector('.db-table');

dbTable.addEventListener('click', function (event) {
  var target = event.target,
    parent = target.parentNode,
    cellArr = [],
    i = 0,
    docFrag,
    input,
    td;

  if (parent.className !== 'record') {
    return;
  }

  if (target.className === 'record-edit-field') {
    console.log('edit mode');
    return;
  }

  console.log(parent);

  cellArr = Array.prototype.slice.call(parent.querySelectorAll('td'));
  cellArr = cellArr.map(function (node) {
    return node.textContent;
  });

  parent.classList.toggle('record-edit');

  docFrag = document.createDocumentFragment();
  for (i = 0; i < cellArr.length; i++) {
    input = document.createElement('input');
    td = document.createElement('td');
    input.value = cellArr[i];
    input.className = 'record-edit-field';
    td.appendChild(input);
    docFrag.appendChild(td);
  }

  parent.innerHTML = '';
  parent.appendChild(docFrag);
}, false);