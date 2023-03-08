const commentFormHandler = async (event) => {
  
  event.preventDefault();

    const comment = document.querySelector('#commentInput').value.trim();


    if (comment) {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({comment_text}),
        headers: { "Content-Type": "application/json" },
      })
      

      if (response.ok) {
        console.log("comment successful")
        document.location.replace("/");
      } else {
        alert("failed to post message");
      }
    }
  };


  document.querySelector("#comment-form").addEventListener("submit", commentFormHandler);