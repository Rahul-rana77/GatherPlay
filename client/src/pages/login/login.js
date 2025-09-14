const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:8000/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful!");
      localStorage.setItem("token", data.token); // save JWT
      localStorage.setItem("email", data.user.email);
      window.location.href = "../home/home.html"; // redirect to home
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    alert("Something went wrong!");
  }
});
