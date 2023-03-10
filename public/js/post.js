const postFormHandler = async (event) => {
  
  event.preventDefault();

  console.log('this button works');
    const post_title = document.querySelector('#post-title').value.trim();

    const post = document.querySelector('#post-text').value.trim();

    if (post_title && post) {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ post_title, post}),
        headers: { "Content-Type": "application/json" },
      })
      

      if (response.ok) {
        console.log("post successful")
        document.location.replace("/");
      } else {
        alert("failed to post message");
      }
    }
  };


  document.querySelector("#postForm").addEventListener("submit", postFormHandler);