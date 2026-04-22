import React, { useState } from "react";
import "./App.css";

const users = [
  { name: "Rohan Rana", upi: "rohan7699170963-1@okicici" },
  { name: "Prince Ali sek ", upi: "princepanda7029-1@okhdfcbank" },
  { name: "Rudra", upi: "10011727rudraprasad@oksbi" },
  { name: "Bibeak Sharma", upi: "sourav@upi" },
  { name: "Bhaskar", upi: "arijit@upi" }
];

function App() {
  const [amount, setAmount] = useState("");

  const pay = (upi, name) => {
  if (!amount) {
    alert("Amount dao age");
    return;
  }

  const url = `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR&tn=RoomPayment`;
  window.location.href = url;
};

  return (
    <div className="container">
      <h1>💸 Room Payment</h1>

      <input
        type="number"
        placeholder="Amount likho"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="grid">
        {users.map((user, index) => (
          <button key={index} onClick={() => pay(user.upi, user.name)}>
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;