(function () {
  var AdminPageController = {
    _ui: {
      dbTable: '.db-table',
      updateBtn: '.record-update',
      delBtn: '.record-delete'
    },

    init: function () {
      this._recordToInitState();
      this._mapDOMElements();
      this._createEventListeners();
    },

    /*
     * Loop through each key and reassign it with the querySelector
     *   of the selector string
     */
    _mapDOMElements: function () {
      var keys = Object.keys(this._ui),
        i,
        len;

      for (i = 0, len = keys.length; i < len; i++) {
        buffer = document.querySelectorAll(this._ui[keys[i]]);
        this._ui[keys[i]] = buffer;
      }
    },

    /*
     * Check if obj is an Array or a NodeList and if it contains at least
     *   1 element
     */
    _isNonEmptyArray: function (obj) {
      return (obj.constructor.name === 'Array' || obj.constructor.name === 'NodeList') && obj.length;
    },

    _createTableListener: function () {
      this._ui.dbTable[0].addEventListener('click', function (event) {
        var target = event.target,
          parent = target.parentNode,
          cellArr = [],
          filteredArr = [],
          i = 0,
          docFrag,
          input,
          td,
          node,
          btn,
          delBtn;

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

        delBtn = parent.querySelector('.record-delete');
        delBtn.classList.toggle('hidden');
        btn.appendChild(delBtn);        

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
        docFrag.appendChild(btn);

        parent.innerHTML = '';
        parent.appendChild(docFrag);
      }, false);
    },

    _recordToInitState: function (node) {
      node = node || document.createElement('div');
      var i, len, hash = [], htmlOutput, template,
        inputs = node.querySelectorAll('INPUT');

      for (i = 0, len = inputs.length; i < len; i++) {

      }
      
      // template system
      template = Handlebars.templates['edit-record.hbs'];
      htmlOutput = template({data: 'testing templates'});      

    },

    _createButtonListener: function () {
      document.addEventListener('click', function (event) {
        var target = event.target,
          record;

        if (target.tagName === 'BUTTON') {
          record = target.parentNode.parentNode;

          if (target.classList.contains('record-update')) {
            console.log('delete update');
          } else if (target.classList.contains('record-delete')) {
            console.log('delete record');
          }

        }
        

      });      
    },

    _createEventListeners: function () {
      if (this._isNonEmptyArray(this._ui.dbTable)) {
        this._createTableListener();
        this._createButtonListener();
      } else {
        console.log('UI hash error');
        return;
      }

      

    }
  };

  // namespace
  window.applejacks.pageController = AdminPageController;
  // initialize controller
  AdminPageController.init();

})();