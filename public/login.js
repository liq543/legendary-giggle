document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;

  const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.success) {
      window.location.href = '/dashboard';  // Redirect to dashboard or any other page
  } else {
      alert(data.message);
  }
});

document.querySelector('.signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name-signup').value;
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;

  const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (data.success) {
      window.location.href = '/login';  // Redirect to login page or any other page
  } else {
      alert(data.message);
  }
});
