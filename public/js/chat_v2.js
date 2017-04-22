
 function Chat() {
   const socket = io.connect('/');

   /**
    * A function to abstract away the native fetch()
    *
    * @param {String} url The url string being accessed
    * @param {Object} data The options data used to create a Request
    *
    * @returns {Promise} A promise that resolves a server or api response as json
    */
   const makeAPICall = (url, data) => {
     let options = {method, headers, mode, cache} = data;

     options.mode = options.mode || 'same-origin';
     if (options.headers === undefined) {
       options.headers = new Headers();
       options.headers.append("Content-type", "application/json");
       options.headers.append("Accept", "application/json, text/plain");
     }

     let request = new Request(url, options);

     return fetch(request).then((response) => response.json());
   };

   const messageForm = document.querySelector('#send-message');
   const chatList = document.querySelector('#chat');

   messageForm.addEventListener('submit', (evt) => {
     evt.preventDefault();
     const message =  document.querySelector('#message');
     const form = {
       message: message.value || ''
     };

     if (!message.value) {
       return;
     }

     makeAPICall('/chat2', {
       "method": "post",
       "body": JSON.stringify(form)
     }).then(() => message.value = '');

   });

   socket.on('news', (data) => {
     console.log('DATA RECEIVED', data);
     let messageNode = document.createElement('LI');
     const d = new Date(Date.now());
     const { fromNow } = data;
     const timeStamp = `${d.toDateString()} ${d.toLocaleTimeString('en-US')}`;

     messageNode.tabIndex = 1;
     messageNode.className = 'last-m';
     const el = document.querySelector('.last-m');
     if (el) {
       el.classList.remove('last-m');
     }

     messageNode.textContent = `[${fromNow}] ${data.hello}`;
     chat.appendChild(messageNode);
     messageNode.focus();
     document.querySelector('.last-m').removeAttribute('tabIndex');

     message.focus();
   });
}

if (document.querySelector('#send-message')) {
  Chat();
}