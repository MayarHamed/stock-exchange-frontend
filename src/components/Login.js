import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if ((username.toLowerCase() === "admin" && password === "admin123") ||
        (username.toLowerCase() === "user" && password === "user123")) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      onLogin({ username });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="btn btn-green">Login</button>
    </div>
  );
}
