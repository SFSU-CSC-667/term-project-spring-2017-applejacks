const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const email = formData.get('email');
  const pwd = formData.get('pwd');
  const pwdConfirm = formData.get('pwdConfirm');
  const username = formData.get('username');
  const data = { email, pwd, pwdConfirm, username };

  fetch('/signup', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    const { error } = data;
    if (error) {
      document.querySelector('.signup-error').textContent = error;
    } else {
      window.location = '/lobby';
    }
  });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const pwd = formData.get('pwd');
  const data = { email, pwd };

  fetch('/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    const { error } = data;
    if (error) {
      document.querySelector('.login-error').textContent = error;
    } else {
      window.location = '/lobby';
    }
  });
});