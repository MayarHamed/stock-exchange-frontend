import React, { useState } from "react";

export default function ExchangeForm({ user }) {
  const [exchange, setExchange] = useState({ name: "", description: "" });

  const handleSubmit = () => {
    console.log("Exchange to add:", exchange);
    setExchange({ name: "", description: "" });
  };

  return (
    <div>
      <h2>Add Exchange</h2>
      <input placeholder="Name" value={exchange.name} onChange={e => setExchange({ ...exchange, name: e.target.value })} />
      <input placeholder="Description" value={exchange.description} onChange={e => setExchange({ ...exchange, description: e.target.value })} />
      <button onClick={handleSubmit}>Add Exchange</button>
    </div>
  );
}