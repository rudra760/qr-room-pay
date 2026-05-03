import React, { useState } from "react";
import "./App.css";

const users = [
  { name: "Rohan Rana", upi: "rohan7699170963-1@okicici", emoji: "🧑" },
  { name: "Prince Ali Sek", upi: "princepanda7029-1@okhdfcbank", emoji: "👑" },
  { name: "Rudra", upi: "10011727rudraprasad@oksbi", emoji: "⚡" },
  { name: "Bibeak Sharma", upi: "sourav@upi", emoji: "🎯" },
  { name: "Bhaskar", upi: "arijit@upi", emoji: "🌟" },
  { name: "Partho Saha", upi: "8695379031@kotak811", emoji: "👩" },
];

function App() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Room Payment");

  const handlePay = (user) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter amount first!");
      return;
    }
    const upiUrl =
      `upi://pay?pa=${encodeURIComponent(user.upi)}` +
      `&pn=${encodeURIComponent(user.name)}` +
      `&am=${parseFloat(amount).toFixed(2)}` +
      `&cu=INR` +
      `&tn=${encodeURIComponent(note)}`;
    window.location.href = upiUrl;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>💸 Room Payment</h1>
        <p className="subtitle">Split & pay instantly via UPI</p>
      </div>
      <div className="input-section">
        <div className="input-group">
          <span className="rupee">₹</span>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="note-input"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="grid">
        {users.map((user, index) => (
          <button key={index} className="user-card" onClick={() => handlePay(user)}>
            <span className="user-emoji">{user.emoji}</span>
            <span className="user-name">{user.name}</span>
            <span className="user-upi">{user.upi}</span>
            <span className="pay-label">Tap to Pay →</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;