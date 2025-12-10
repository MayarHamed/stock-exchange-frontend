import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ExchangeList({ user }) {
  const [exchanges, setExchanges] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [newExchange, setNewExchange] = useState({ name: "", description: "" });
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState("");

  const isAdmin = user.username.toLowerCase() === "admin";

  const fetchExchanges = () => {
    axiosInstance.get("/api/exchanges")
      .then(res => setExchanges(res.data))
      .catch(err => console.error(err));

    axiosInstance.get("/api/stocks")
      .then(res => setStocks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => fetchExchanges(), []);

  const createExchange = () => {
    if (!newExchange.name || !newExchange.description) return;
    setError("");
    axiosInstance.post("/api/exchanges", newExchange)
      .then(() => {
        setNewExchange({ name: "", description: "" });
        fetchExchanges();
      })
      .catch(err => {
        setError(err.response?.data || err.message);
        console.error("Error creating exchange:", err);
      });
  };

  const deleteExchange = (id) => {
    setError("");
    axiosInstance.delete(`/api/exchanges/${id}`)
      .then(fetchExchanges)
      .catch(err => {
        setError(err.response?.data || err.message);
        console.error("Error deleting exchange:", err);
      });
  };

  const assignStock = (exchangeId, stockId) => {
    setError("");
    axiosInstance.post(`/api/exchanges/${exchangeId}/stocks/${stockId}`)
      .then(fetchExchanges)
      .catch(err => {
        setError(err.response?.data || err.message);
        console.error("Error assigning stock:", err);
      });
  };

  const removeStock = (exchangeId, stockId) => {
    setError("");
    axiosInstance.delete(`/api/exchanges/${exchangeId}/stocks/${stockId}`)
      .then(fetchExchanges)
      .catch(err => {
        setError(err.response?.data || err.message);
        console.error("Error removing stock:", err);
      });
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="table-wrapper">
      <h2 className="title">Exchanges</h2>

      {error && <p className="error">{error}</p>}

      {isAdmin && (
        <div className="form-row">
          <input
            placeholder="Name"
            value={newExchange.name}
            onChange={e => setNewExchange({ ...newExchange, name: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newExchange.description}
            onChange={e => setNewExchange({ ...newExchange, description: e.target.value })}
          />
          <button className="btn blue" onClick={createExchange}>Add Exchange</button>
        </div>
      )}

      <table className="stock-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Live</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {exchanges.map(ex => (
            <React.Fragment key={ex.id}>
              <tr className="main-row" onClick={() => toggleExpand(ex.id)}>
                <td className="expand-cell">{expanded[ex.id] ? "▼" : "►"}</td>
                <td>{ex.name}</td>
                <td>{ex.description}</td>
                <td>{ex.liveInMarket ? "Live" : "Not Live"}</td>
                {isAdmin && (
                  <td>
                    <button
                      className="btn red"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExchange(ex.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>

              {expanded[ex.id] && (
                <tr className="sub-row">
                  <td colSpan={isAdmin ? 5 : 4}>
                    <div className="sub-box">
                      <h4>Assigned Stocks</h4>
                      <ul className="mini-list">
                        {ex.stocks?.length > 0 ? (
                          ex.stocks.map(stock => (
                            <li key={stock.id} className="stock-item">
                              <div className="stock-line">
                                <span>{stock.name}</span>
                                {isAdmin && (
                                  <button
                                    className="btn red mini remove-btn"
                                    onClick={() => removeStock(ex.id, stock.id)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </li>
                          ))
                        ) : (
                          <p className="empty-text">No stocks assigned</p>
                        )}
                      </ul>

                      {isAdmin && (
                        <div className="assign-section">
                          <label>Assign New Stock:</label>
                          <select
                            defaultValue=""
                            onChange={e => assignStock(ex.id, Number(e.target.value))}
                            className="select-field"
                          >
                            <option value="" disabled>Select a stock</option>
                            {stocks.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
