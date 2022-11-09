let signupFormEl = document.querySelector("#signup");

const handleSubmit = async (event) => {
  event.preventDefault();

  console.log("Getting form input fields");

  /* get user's email, username and password from the input fields */
  const email = document.querySelector("#inputEmail").value;
  const username = document.querySelector("#inputUsername").value;
  const password = document.querySelector("#inputPassword").value;

  /* send a fetch request to post to /api/users */
  try {
    let response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password })
    });
    if(response.ok) {
      /* If signed up, user is logged in too, go to dashboard */
      document.location.replace('/dashboard');
    } else {
      alert(response.status);
    }
  } catch (err) {
    alert(err);
  }
}

signupFormEl.addEventListener('submit', handleSubmit);
