/**
 * Game View for handling UI interactions of game page
 */
function Lobby() {
  const PAGE_KEY = '#lobby-page';
  const page = document.querySelector(PAGE_KEY);

  // Ui hash
  let ui = {
    createGameBtn: '[data-action-create-game]',
    joinGameBtn: '[data-action-join-game]',
    gamesList: '.games-list',
    userId: '#user-info .id',
    isAdmin: '#user-info .isAdmin'
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

  // create game event click handler
  const createGame = (e) => {
    console.log(`Create game ${e.currentTarget.className}.`);
    const uid = ui.userId[0].textContent;

    makeAPICall(`/api/lobby/${uid}/createGame`, { method: 'post' })
    .then((id) => {
      const template = Handlebars.templates['game-row.hbs'];
      const htmlOutput = template({
        name: 'new game-' + (id*2 - 7),
        id: id,
        count: 0,
        maxCapacity: 4
      });

      let t = document.createElement('template');
      t.innerHTML = htmlOutput;
      document.querySelector('.games-list tbody').appendChild(t.content.firstChild);
    });
  };

  // join game event click handler
  const joinGame = (e) => {
    const { dataset } = e.target;
    const { gameId } = dataset;
    const uid = ui.userId[0].textContent;

    if (!dataset.hasOwnProperty('actionJoinGame')) {
      console.log('nope.');
      return;
    }

    console.log(`Join game ${gameId} ?`);
    window.location = `/game/${gameId}`;
  };

  /**
   * Creating action handlers for all user action buttons.
   * Actions include bet, stay, and hit.
   */
  const addGameActionHandlers = () => {
    const create = ui.createGameBtn[0];
    const list = ui.gamesList[0];

    if (create) {
      create.addEventListener('click', createGame, false);
    }

    if (list) {
      list.addEventListener('click', joinGame, false);
    }
  };

  // expose public functions here
  return {
    // init() is a public function that is called to initialize view
    init: () => {
      console.log('LOB INIT');
      const socket = io('/my-namespace');

      // socket for showing game immediatley after it's created
      socket.on('game-created', (id) => {
        console.log('Socket channel found');
        template = Handlebars.templates['game-row.hbs'];
        htmlOutput = template({
          name: 'new game-' + (id*2 - 7),
          id: id,
          count: 0,
          maxCapacity: 4
        });

        let t = document.createElement('template');
        t.innerHTML = htmlOutput;
        document.querySelector('.games-list tbody').appendChild(t.content.firstChild);
      });

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
