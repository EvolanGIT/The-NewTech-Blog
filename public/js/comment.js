const commentFormHandler = async (event) => {
  
  event.preventDefault();
  

  const post_id = document.querySelector('#post_id').value;
  const comment_text = document.querySelector('#commentInput').value.trim();
  console.log(post_id);
  
  if (comment_text) {
      console.log('this is passing the data')
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({comment_text, post_id}),
        headers: { "Content-Type": "application/json" },
      })
      

      if (response.ok) {
        console.log("comment successful")
        // document.location.reload();
      } else {
        alert("failed to post message");
      }
    }
  };


  document.querySelector("#comment-form").addEventListener("submit", commentFormHandler);