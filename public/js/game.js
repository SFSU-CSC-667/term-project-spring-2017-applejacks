/**
 * Game View for handling UI interactions of game page
 */
function Game() {
  const PAGE_KEY = '#game-page';
  const page = document.querySelector(PAGE_KEY);

  // Ui hash
  let ui = {
    hitBtn: '[data-app-hit]',
    stayBtn: '[data-app-stay]',
    betBtn: '[data-app-place-bet]',
    userSectionActions: '.user-section--actions button',

    userId: '#user-info .id',
    betValue: '[data-bet]'
  };

  /**
   * Helper function to complete a namespace look up of a
   * specific Element using a query selector.
   *
   * @param {String} selector A string used to find an Element in the namespace
   *
   * @returns {Element} An Element object
   */
  const getElement = (selector) => {
    // Use 'page' to ensure only page level elements are picked up
    // do not want headers or footers to be included.
    // Could use $(selector) if people prefer jQuery over vanilla
    return page.querySelectorAll(selector);
  };

  // Creates DOM element from query string
  const bindElementsToPage = () => {
    // Loop through document query selectors specified in `ui`
    for (key in ui) {

      // Avoid any inherited properties
      if (ui.hasOwnProperty(key)) {
        let selector = ui[key];

        // Retrieve the documend Node associated with current selector
        let element = getElement(selector);

        // Override reference to a string with a reference to an object Element
        ui[key] = element;
      }
    }
  };

  const attachEventListeners = () => {
    // Add individual event listeners here
    addGameActionHandlers();
  };

  /**
   * A function to abstract away the native fetch()
   *
   * @param {String} url The url string being accessed
   * @param {Object} data The options data used to create a Request
   *
   * @returns {Promise} A promise that resolves a server or api response as json
   */
 const makeAPICall = (url, data={}) => {
    let options = {method, headers, mode, cache} = data;
    let body = {};

    console.log('API Body 1 is: ' + JSON.stringify(options.body));

    try {
      if (typeof options.body === 'object') {
        options.body = JSON.stringify(options.body)
      } else {
        body = JSON.parse(options.body);
        options.body = JSON.stringify({body:options.body});
      }
    } catch(err) {
      console.log('Error with the data you are passing', err);
      options.body = '{}';
    }
    // data passed to server must be sent as a string. Checking if data has been strigified yet.

    /*if (!options.method || options.method.toLowerCase() !== 'get') {//////////////////////is this necessary?
      delete options.body;
    }*/

    options.credentials = 'same-origin';

    if (options.headers === undefined) {
      options.headers = new Headers();
      options.headers.append("Content-type", "application/json");
      options.headers.append("Accept", "application/json, text/plain");
    }

    let request = new Request(url, options);
    console.log('API Body 2 is: ' + JSON.stringify(options.body));

    return fetch(request).then((response) => response.json());
  };

  const shuffle = (deck) => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const len = deck.length;

    return deck.map((val, i) => {
      if (i >= len - 2) {
        return val;
      }

      let rand = getRandomInt(i,len);
      let buffer = deck[rand];
      deck[rand] = val;

      return buffer;
    });
  };

  const modifyWinnings = (newValue) => {
      let added = Number(newValue);

      if (isNaN(added) || !added) {
        return;
      }

      let add = true;
      if (added < 0) {
        add = false;
      }

      const currAmount = Number(value.textContent);
      const interval = 10;
      added = Math.abs(added);
      const intId = setInterval((t) => {
        let winningsVal = Number(winnings.textContent)
        winnings.textContent = add ? winningsVal + 1 : winningsVal - 1;
        added -= 1;
        if (added <= 0) {
          clearInterval(intId);
        }
      }, interval);
  };

  /**
   * Handler for when the user places bets on current blackjack game.
   * Will happen once per game (maybe more if we implement splitting)
   *
   * @param {Event} event
   */
  const betHandler = (event) => {
    console.log(`Bet placed for ${event.currentTarget.className}.`);
    const betVal = ui.betValue[0].value;
    const gameId = location.href.split('/').pop();

    const userId = document.querySelector("#user-info .id").textContent;
    console.log(userId);
    console.log('Bet Placed:' + JSON.stringify(betVal));

    // To get userId, look at how I pass down a user object on the lobby page. Rendering it in the page, and then
    // using the ui hash to get the values


    // ToDO:
    // - use makeAPICall(<api url>, options)
    // - add method property ('post') on options object
    // - add body property on options object. Assign it a bet value object.
    makeAPICall(`/api/game/${gameId}/bet/${userId}`, { method: 'post', body: betVal})
    
  };

  /**
   * Handler for when the user decides to hit and receive another card.
   *
   * @param {Event} event
   */
  const hitHandler = (event) => {
    console.log(`Hit for ${event.currentTarget.className}.`);
  };

  /**
   * Handler for when the user decides to stay and not receive another card
   *
   * @param {Event} event
   */
  const stayHandler = (event) => {
    console.log(`Stay for ${event.currentTarget.className}.`);

    // example API call
    // - add API routes to api/index.js
    // - then add the corresponding api file in api/
    makeAPICall('/api/logmessage', {}) // pass in options { method: 'post' } for POST calls
    .then((data) => {
      console.log(data);
    });
  };

  /**
   * Creating action handlers for all user action buttons.
   * Actions include bet, stay, and hit.
   */
  const addGameActionHandlers = () => {
    const actions = Array.prototype.slice.call(ui.userSectionActions);

    actions.forEach((btnEl) => {
      const bet = btnEl.hasAttribute('data-action-place-bet');
      const stay = btnEl.hasAttribute('data-action-stay');
      const hit = btnEl.hasAttribute('data-action-hit');
      let handler = {};

      if (bet) {
        handler = betHandler;
      } else if (stay) {
        handler = stayHandler;
      } else if (hit) {
        handler = hitHandler;
      }

      btnEl.addEventListener('click', handler, false);
    });
  };

  // expose public functions here
  return {
    // init() is a public function that is called to initialize view
    init: () => {

      const socket = io('/game/${id}');
      socket.on('game-created', (id) => {

      });

      // private functions called from within context of view controller
      bindElementsToPage();
      attachEventListeners();
    }
  };
}

// Create Lobby view controller
const game = new Game();

// Call init to setup view
if (document.querySelectorAll('#game-page').length) {
  game.init();
}


