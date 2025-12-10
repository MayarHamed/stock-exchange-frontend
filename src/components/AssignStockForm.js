import React, { useState } from "react";
import { assignStock, removeStock } from "../api/exchangeService";

const AssignStockForm = ({ exchanges, stocks, onUpdate }) => {
  const [exchangeId, setExchangeId] = useState("");
  const [stockId, setStockId] = useState("");

  const handleAssign = async () => {
    await assignStock(exchangeId, stockId);
    if (onUpdate) onUpdate();
  };

  const handleRemove = async () => {
    await removeStock(exchangeId, stockId);
    if (onUpdate) onUpdate();
  };

  return (
    <div>
      <select value={exchangeId} onChange={(e) => setExchangeId(e.target.value)}>
        <option value="">Select Exchange</option>
        {exchanges.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <select value={stockId} onChange={(e) => setStockId(e.target.value)}>
        <option value="">Select Stock</option>
        {stocks.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <button onClick={handleAssign}>Assign Stock</button>
      <button onClick={handleRemove}>Remove Stock</button>
    </div>
  );
};

export default AssignStockForm;