addButtonEl = document.querySelector("#addPost");

const onAddBtnClick = async () => {
   /* send a fetch request to post to /signup */
   console.log("Sending request to create a new post");
   const response = await fetch('/post', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    });
  if(response.ok) {
    console.log("Logged in, Create a new post");
    document.location.replace('/dashboard'); 
  } else {
    console.log("user not logged in");
    alert(response.status);
  }
}
addButtonEl.addEventListener('click', onAddBtnClick);
