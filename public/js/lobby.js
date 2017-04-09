/**
 * Game View for handling UI interactions of game page
 */
function Lobby() {
  const PAGE_KEY = '#lobby-page';
  const page = document.querySelector(PAGE_KEY);

  // Ui hash
  let ui = {
    hitBtn: '[data-app-hit]'
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

    if (options.headers === undefined) {
      options.headers = new Headers();
      options.headers.append("Content-type", "application/json");
      options.headers.append("Accept", "application/json, text/plain");
    }

    let request = new Request(url, options);

    return fetch(request).then((response) => response.json());
  };

  const createGame = (e) => {
    console.log(`Create game ${e.currentTarget.className}.`);

    makeAPICall('/api/game/1/createGame/123', { method: 'post' })
    .then((data) => {
      console.log(data);
    });
  };

  /**
   * Creating action handlers for all user action buttons.
   * Actions include bet, stay, and hit.
   */
  const addGameActionHandlers = () => {
    const gameBtn = ui.createGameBtn;
    gameBtn.addEventListener('click', createGame, false);

  };

  // expose public functions here
  return {
    // init() is a public function that is called to initialize view
    init: () => {
      // private functions called from within context of view controller
      bindElementsToPage();
      attachEventListeners();
    }
  };
}

// Create Lobby view controller
const lobby = new Lobby();

// Call init to setup view
if (document.querySelectorAll('#lobby-page').length) {
  lobby.init();
}


