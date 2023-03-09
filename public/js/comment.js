const commentFormHandler = async (event) => {
  
  event.preventDefault();
  
  const comment_data = document.querySelector('#commentInput').value.trim();
  
  
  if (comment_data) {
      console.log(comment_data)
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({comment_text}),
        headers: { "Content-Type": "application/json" },
      })
      

      if (response.ok) {
        console.log("comment successful")
        document.location.replace("/dashboard");
      } else {
        alert("failed to post message");
      }
    }
  };


  document.querySelector("#comment-form").addEventListener("submit", commentFormHandler);