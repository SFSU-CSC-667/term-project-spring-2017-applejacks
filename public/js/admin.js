(function () {
  var AdminPageController = {
    _ui: {
      dbTable: '.db-table'
    },

    init: function () {
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

    _createEventListeners: function () {
      if (!this._isNonEmptyArray(this._ui.dbTable)) {
        console.log('UI hash error');
        return;
      }

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
    }


  };

  // namespace
  window.applejacks.pageController = AdminPageController;
  // initialize controller
  AdminPageController.init();

})();