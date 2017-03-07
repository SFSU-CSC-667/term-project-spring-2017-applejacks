(function () {
  var Router = {
    _ui: {
      navLink: '.header'
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
      if (!this._isNonEmptyArray(this._ui.navLink)) {
        console.log('UI hash error');
        return;
      }

      this._ui.navLink[0].addEventListener('click', function (event) {
        // event.preventDefault();
        console.log('navigation -> ' + event.target.textContent);

      }, false);
    }
  };

  // namespace
  window.applejacks.pageController = Router;
  // initialize controller
  Router.init();
})();