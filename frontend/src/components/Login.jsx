import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   function validateInputs() {
    if (!email.trim()) {
      return "Email cannot be empty.";
    }
    if (!email.includes("@")) {
      return "Email must include @.";
    }
    if (!password.trim()) {
      return "Password cannot be empty.";
    }
    return null;
  }
  async function handleLogin(e) {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setError(error);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect to homepage
      window.location.href = "/";
    } catch (err) {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
