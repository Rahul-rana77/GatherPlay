const form = document.getElementById("signupForm");
const messageBox = document.getElementById("message");

const API_BASE = "http://localhost:8000/api/v1/user";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    console.log(data);
    

    if (!res.ok) {
      messageBox.textContent = data.error || "Registration failed!";
      messageBox.style.color = "#f87171"; // red
    } else {
      messageBox.textContent = "Registration successful! Redirecting...";
      messageBox.style.color = "#4ade80"; // green
      setTimeout(() => {
        window.location.href = "./pages/home/home.html";
      }, 1500);
    }
  } catch (err) {
    console.error("Error:", err);
    messageBox.textContent = "Something went wrong!";
    messageBox.style.color = "#f87171"; // red
  }
});
