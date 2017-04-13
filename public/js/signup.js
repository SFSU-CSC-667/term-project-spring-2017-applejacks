const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const pwd = formData.get('pwd');
  const data = { email, pwd };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    const { error } = data;
    document.querySelector('.login-error').textContent = error;
  });
});