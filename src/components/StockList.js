import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function StockList({ user }) {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ name: "", description: "", currentPrice: "" });
  const [priceUpdates, setPriceUpdates] = useState({});
  const [error, setError] = useState("");

  const fetchStocks = () => {
    axiosInstance.get("/api/stocks")
      .then(res => setStocks(res.data))
      .catch(err => console.error("Error fetching stocks:", err));
  };

  useEffect(() => fetchStocks(), []);

  const createStock = () => {
    if (!newStock.name || !newStock.description || !newStock.currentPrice) return;

    setError("");
    axiosInstance.post("/api/stocks", newStock)
      .then(() => {
        setNewStock({ name: "", description: "", currentPrice: "" });
        fetchStocks();
      })
      .catch(err => {
        const msg = err.response?.data || err.message;
        setError(msg);
        console.error("Error creating stock:", err);
      });
  };

  const deleteStock = (id) => {
    setError("");
    axiosInstance.delete(`/api/stocks/${id}`)
      .then(fetchStocks)
      .catch(err => setError(err.response?.data || err.message));
  };

  const updatePrice = (id) => {
    const newPrice = priceUpdates[id];
    if (!newPrice) return;

    setError("");
    axiosInstance.put(`/api/stocks/${id}/price`, JSON.stringify(newPrice), { headers: { "Content-Type": "application/json" } })
      .then(fetchStocks)
      .catch(err => setError(err.response?.data || err.message));
  };

  const isAdmin = user.username.toLowerCase() === "admin";

  return (
    <div className="table-wrapper">
      <h2 className="title">Stocks</h2>

      {error && <p className="error">{error}</p>}

      {isAdmin && (
        <div className="form-row">
          <input
            placeholder="Name"
            value={newStock.name}
            onChange={e => setNewStock({ ...newStock, name: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newStock.description}
            onChange={e => setNewStock({ ...newStock, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newStock.currentPrice}
            onChange={e => setNewStock({ ...newStock, currentPrice: e.target.value })}
            className="small"
          />
          <button className="btn green" onClick={createStock}>Add Stock</button>
        </div>
      )}

      <table className="stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Current Price</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.description}</td>
              <td>{stock.currentPrice}</td>
              {isAdmin && (
                <td>
                  <div className="actions">
                    <button className="btn red" onClick={() => deleteStock(stock.id)}>Delete</button>
                    <input
                      type="number"
                      value={priceUpdates[stock.id] || ""}
                      placeholder="New Price"
                      onChange={e => setPriceUpdates({ ...priceUpdates, [stock.id]: e.target.value })}
                      className="small"
                    />
                    <button className="btn blue" onClick={() => updatePrice(stock.id)}>Update</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
