  const signUpFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const first_name = document.querySelector("#First-Name").value.trim();
    const last_name = document.querySelector("#Last-Name").value.trim();
    const user_name = document.querySelector("#Username").value.trim();
    const email = document.querySelector("#E-mail").value.trim();
    const password = document.querySelector("#Password").value.trim();

    if (email && password) {
      // Send the e-mail and password to the server
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, password, user_name, first_name, last_name}),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("sign up successful")
        document.location.replace("/dashboard");
      } else {
        alert("Failed to log in");
      }
    }
  };

document.querySelector('#sign-up-form').addEventListener('submit', signUpFormHandler);