loginFormEl = document.querySelector("#login");

const handleLoginForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#inputUsername").value;
  const password = document.querySelector("#inputPassword").value;

  console.log( username + " " + password);

  /* send a fetch request to post to /signup */
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
    });
  if(response.ok) {
    console.log("Logged in");   
  }
}
loginFormEl.addEventListener('submit', handleLoginForm);