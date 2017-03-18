/**
 * Lobby View for handling UI interactions of lobby page
 */
const Lobby = () => {
    const PAGE_KEY = '#lobby-page';
    const page = document.querySelector(PAGE_KEY);

    // Ui hash
    let ui = {
      page: '#lobby-page',
      title: 'h1'
    };

    // Helper function
    const getNode = (selector) => {
      // Use 'page' to ensure only page level elements are picked up
      // do not want headers or footers to be included.
      // Could use $(selector) if people prefer jQuery over vanilla
      return page.querySelectorAll(selector);
    };

    // creates DOM element from query string
    const bindElementsToPage = () => {
      const hashKeys = Object.keys(ui);

      for (let i = 0; i < hashKeys.length; i++) {
        let key = hashKeys[i];

        if (ui.hasOwnProperty(key)) {
          let selector = ui[key];
          let node = getNode(selector);
          ui[key] = node;
        }
      }
    };

    const attachEventListeners = () => {
      // Add individual event listeners here
      addTitleEventListener();
    };

    // Example event listener
    const addTitleEventListener = () => {
      const title = ui.title[0];

      // This listener stays alive while page is in view
      // To remove an event listener, event listener function must have a name
      // which then gets passed into removeEventListener()
      title.addEventListener('mouseover', (event) => {
        console.log('Your mouse is hovering over the title!');
      });

      // This listener gets remove after it fires once
      title.addEventListener('click', (event) => {
        console.log('One time click and then remove listener.');
      }, {once: true}, false);
    };

    let privateVar = 'hello';

    return {
      init: () => {
        bindElementsToPage();
        attachEventListeners();
      },

      publicFunction: () => {
        console.log(privateVar + ' world');
      }
    };
};

// Create Lobby view controller
const lobby = Lobby();

// Call init to setup view
lobby.init();

// Example
lobby.publicFunction(); // hello world
console.log(lobby.privateVar); // undefined
