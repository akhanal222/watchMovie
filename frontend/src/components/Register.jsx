import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateInputs() {
    if (!username.trim()) {
      return "Username cannot be empty.";
    }
    if (!email.includes("@")) {
      return "Email must include @.";
    }
    if (!email.trim()) {
      return "Email cannot be empty.";
    }
    if (!password.trim()) {
      return "Password cannot be empty.";
    }
    return null; 
  }

  async function handleRegister(e) {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setError(error);
      return;
    }

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      alert("Account created! Please log in.");
      window.location.href = "/login";
    } catch (err) {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleRegister}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
