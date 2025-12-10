import React, { useState } from "react";

export default function StockForm({ user }) {
  const [stock, setStock] = useState({ name: "", description: "", currentPrice: "" });

  const handleSubmit = () => {
    console.log("Stock to add:", stock);
    setStock({ name: "", description: "", currentPrice: "" });
  };

  return (
    <div>
      <h2>Add Stock</h2>
      <input placeholder="Name" value={stock.name} onChange={e => setStock({ ...stock, name: e.target.value })} />
      <input placeholder="Description" value={stock.description} onChange={e => setStock({ ...stock, description: e.target.value })} />
      <input placeholder="Price" type="number" value={stock.currentPrice} onChange={e => setStock({ ...stock, currentPrice: e.target.value })} />
      <button onClick={handleSubmit}>Add Stock</button>
    </div>
  );
}