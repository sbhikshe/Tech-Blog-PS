saveUpdatesButtonEl = document.querySelector("#updatePost");

const saveUpdatesHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitleArea").value;
  const contents = document.querySelector("#postTextArea").value;
  const postId = event.target.getAttribute('data-id');
  const createdBy = event.target.getAttribute('data-createdBy');

  /* send a fetch request to save the updates to the post */
  const response = await fetch(`/api/posts/${postId}`, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: postId, title: title, contents: contents, createdBy: createdBy })
  });

  if(response.ok) {
    console.log("saved updates to post");
    document.location.replace('/dashboard'); 
  } else {
    console.log("did not save post updates");
    alert(response.status);
  }
}
saveUpdatesButtonEl.addEventListener('click', saveUpdatesHandler);