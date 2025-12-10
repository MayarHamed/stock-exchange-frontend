import React, { useState } from "react";
import Login from "./components/Login";
import StockList from "./components/StockList";
import ExchangeList from "./components/ExchangeList";
import Menu from "./components/Menu";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("stocks");

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome, {user.username}</h1>

      <Menu onChangeView={setView} />
        {view === "stocks" && <StockList user={user} />}
        {view === "exchanges" && <ExchangeList user={user} />}
      </div>

  );
}

export default App;
