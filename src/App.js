import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import "./App.css";

const users = [
  { name: "Rohan Rana", upi: "rohan7699170963-1@okicici", emoji: "🧑" },
  { name: "Prince Ali Sek", upi: "princepanda7029-1@okhdfcbank", emoji: "👑" },
  { name: "Rudra", upi: "10011727rudraprasad@oksbi", emoji: "⚡" },
  { name: "Bibeak Sharma", upi: "sourav@upi", emoji: "🎯" },
  { name: "Bhaskar", upi: "arijit@upi", emoji: "🌟" },
];

// UPI apps with their deep link schemes
const UPI_APPS = [
  { name: "WhatsApp Pay", scheme: "whatsapp://pay", icon: "💬" },
  { name: "Google Pay", scheme: "tez://upi/pay", icon: "🔵" },
  { name: "PhonePe", scheme: "phonepe://pay", icon: "💜" },
  { name: "Paytm", scheme: "paytmmp://pay", icon: "🔷" },
  { name: "BHIM", scheme: "upi://pay", icon: "🇮🇳" },
  { name: "Any UPI App", scheme: "upi://pay", icon: "📱" },
];

function buildUPIUrl(scheme, upi, name, amount, note = "RoomPayment") {
  const base = scheme.includes("whatsapp")
    ? `upi://pay`
    : scheme;
  return `${base}?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
}

function App() {
  const [amount, setAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("Room Payment");
  const canvasRef = useRef();

  const openPayModal = (user) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount first!");
      return;
    }
    setSelectedUser(user);
    generateQR(user);
    setShowModal(true);
  };

  const generateQR = async (user) => {
    const upiUrl = buildUPIUrl("upi://pay", user.upi, user.name, amount, note);
    try {
      const dataUrl = await QRCode.toDataURL(upiUrl, {
        width: 240,
        margin: 2,
        color: { dark: "#1a1a2e", light: "#ffffff" },
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error("QR generation failed", err);
    }
  };

  const payViaApp = (app) => {
    if (!selectedUser) return;
    const url = buildUPIUrl(app.scheme, selectedUser.upi, selectedUser.name, amount, note);
    window.location.href = url;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setQrDataUrl(null);
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
          <button key={index} className="user-card" onClick={() => openPayModal(user)}>
            <span className="user-emoji">{user.emoji}</span>
            <span className="user-name">{user.name}</span>
            <span className="user-upi">{user.upi}</span>
            <span className="pay-label">Tap to Pay →</span>
          </button>
        ))}
      </div>

      {/* Payment Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            <h2>Pay {selectedUser.name}</h2>
            <p className="modal-amount">₹{amount}</p>
            <p className="modal-upi">{selectedUser.upi}</p>

            {/* QR Code */}
            {qrDataUrl && (
              <div className="qr-section">
                <p className="qr-label">📷 Scan with any UPI app</p>
                <img src={qrDataUrl} alt="UPI QR Code" className="qr-image" />
              </div>
            )}

            {/* App buttons */}
            <p className="or-label">— or open directly in —</p>
            <div className="app-grid">
              {UPI_APPS.map((app, i) => (
                <button key={i} className="app-btn" onClick={() => payViaApp(app)}>
                  <span>{app.icon}</span>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
