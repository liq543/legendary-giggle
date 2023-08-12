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
      window.location.href = '/soundtest';  // Redirect to dashboard or any other page
  } else {
      alert(data.message);
  }
});