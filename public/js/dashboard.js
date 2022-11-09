createPostButtonEl = document.querySelector("#createPost");
ulElementEl = document.querySelector("#postList")

const onCreatePostBtnClick = async () => {
   /* send a fetch request to post a new blog post */
   console.log("Sending request to create a new post");

  const title = document.querySelector("#newPostTitleArea").value;
  const contents = document.querySelector("#newPostTextArea").value;

  console.log("sending fetch with " + title + " " + "contents"); 
   const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            title: title,
            contents: contents
          })
    });
  if(response.ok) {
    console.log("Created a new post");
    document.location.replace('/dashboard'); 
  } else {
    console.log("Did not create the new post");
    alert(response.status);
  }
}

const postItemButtonHandler = async(event) => {
  console.log("button click received on:")
  if(event.target.hasAttribute('data-type')) {
    const actionType = event.target.getAttribute('data-type');
    const postId = event.target.getAttribute('data-id');
    console.log("postId = " + postId);

    if(actionType == "comment") {
      console.log("Comment button!");

    } else if (actionType == "update"){
      console.log("Update button!");

    } else if (actionType == "delete") {
      console.log("Delete button!");

      console.log("sending fetch with delete request"); 
      
      const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      
      if(response.ok) {
        console.log("Deleted post");
      } else {
        console.log("Didn't delete the post");
      }
      document.location.replace('/dashboard'); 
      
    } else {
      console.log("Unidentified button!");
    }

  }
}

createPostButtonEl.addEventListener('click', onCreatePostBtnClick);
if(ulElementEl) { 
  ulElementEl.addEventListener('click', postItemButtonHandler);
}