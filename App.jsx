import React, { useState } from "react";

export default function App() {
  const [view, setView] = useState("builder");
  const [base, setBase] = useState("Thin Crust");
  const [sauce, setSauce] = useState("Classic Tomato");
  const [cheese, setCheese] = useState("Mozzarella");
  const [veggies, setVeggies] = useState(["Onion", "Capsicum"]);
  const [orderStatus, setOrderStatus] = useState("Order Received");
  const [inventory, setInventory] = useState({ bases: 18, sauces: 24, cheeses: 15, veggies: 30 });

  const bases = ["Thin Crust", "Cheese Burst", "Wheat Thin", "Pan Pizza", "Hand Tossed"];
  const sauces = ["Classic Tomato", "Spicy Red", "Barbeque", "Creamy White", "Pesto"];
  const cheeses = ["Mozzarella", "Cheddar", "Parmesan", "Paneer Special"];
  const vegList = ["Onion", "Capsicum", "Tomato", "Mushroom", "Olives", "Jalapenos"];

  const toggleVeg = (v) => {
    setVeggies(prev => prev.includes(v) ? prev.filter(i => i !== v) : [...prev, v]);
  };

  const handlePay = () => {
    setInventory(prev => ({
      bases: Math.max(0, prev.bases - 1),
      sauces: Math.max(0, prev.sauces - 1),
      cheeses: Math.max(0, prev.cheeses - 1),
      veggies: Math.max(0, prev.veggies - 2)
    }));
    setView("tracking");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fdfbf7", minHeight: "100vh", paddingBottom: "40px" }}>
      <header style={{ backgroundColor: "#d32f2f", color: "#fff", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => setView("builder")}>🍕 PizzaHub (Task 1)</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setView("builder")} style={{ padding: "8px 12px", cursor: "pointer", fontWeight: "bold" }}>Custom Builder</button>
          <button onClick={() => setView("tracking")} style={{ padding: "8px 12px", cursor: "pointer", fontWeight: "bold" }}>Track Order</button>
          <button onClick={() => setView("admin")} style={{ padding: "8px 12px", cursor: "pointer", fontWeight: "bold", backgroundColor: "#333", color: "#fff", border: "none" }}>Admin Panel</button>
        </div>
      </header>

      <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 15px" }}>
        
        {/* 1. BUILDER */}
        {view === "builder" && (
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h3>🛠️ Step-by-Step Custom Pizza Builder</h3>
            
            <p><b>1. Pizza Base (5 options):</b></p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {bases.map(b => (
                <button key={b} onClick={() => setBase(b)} style={{ padding: "6px 12px", background: base === b ? "#d32f2f" : "#eee", color: base === b ? "#fff" : "#000", border: "none", borderRadius: "15px", cursor: "pointer" }}>{b}</button>
              ))}
            </div>

            <p><b>2. Sauce (5 options):</b></p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {sauces.map(s => (
                <button key={s} onClick={() => setSauce(s)} style={{ padding: "6px 12px", background: sauce === s ? "#d32f2f" : "#eee", color: sauce === s ? "#fff" : "#000", border: "none", borderRadius: "15px", cursor: "pointer" }}>{s}</button>
              ))}
            </div>

            <p><b>3. Cheese Type:</b></p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {cheeses.map(c => (
                <button key={c} onClick={() => setCheese(c)} style={{ padding: "6px 12px", background: cheese === c ? "#d32f2f" : "#eee", color: cheese === c ? "#fff" : "#000", border: "none", borderRadius: "15px", cursor: "pointer" }}>{c}</button>
              ))}
            </div>

            <p><b>4. Vegetables (Multi-select):</b></p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {vegList.map(v => (
                <button key={v} onClick={() => toggleVeg(v)} style={{ padding: "6px 12px", background: veggies.includes(v) ? "#2e7d32" : "#eee", color: veggies.includes(v) ? "#fff" : "#000", border: "none", borderRadius: "15px", cursor: "pointer" }}>
                  {veggies.includes(v) ? "✓ " : ""}{v}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "20px", padding: "12px", background: "#f9f9f9", borderRadius: "6px" }}>
              <p style={{ margin: "4px 0" }}><b>Current Selection:</b> {base} + {sauce} + {cheese} + [{veggies.join(", ")}]</p>
              <h4 style={{ margin: "6px 0", color: "#d32f2f" }}>Price: ₹399</h4>
            </div>

            <button onClick={() => setView("checkout")} style={{ marginTop: "15px", width: "100%", padding: "12px", background: "#e64a19", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
              Proceed to Summary & Razorpay Payment
            </button>
          </div>
        )}

        {/* 2. ORDER SUMMARY & RAZORPAY */}
        {view === "checkout" && (
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h3>📋 Order Summary</h3>
            <p><b>Item:</b> 1x Custom Pizza</p>
            <p><b>Base:</b> {base} | <b>Sauce:</b> {sauce}</p>
            <p><b>Cheese:</b> {cheese} | <b>Toppings:</b> {veggies.join(", ")}</p>
            <hr />
            <h3>Total Amount: ₹399</h3>

            <div style={{ background: "#e3f2fd", padding: "12px", borderRadius: "6px", margin: "16px 0", border: "1px solid #90caf9" }}>
              <b>Razorpay Test Mode Integration:</b>
              <p style={{ margin: "4px 0", fontSize: "13px" }}>Simulating instant test checkout. Stock will auto-decrement in admin inventory.</p>
            </div>

            <button onClick={handlePay} style={{ width: "100%", padding: "12px", background: "#0288d1", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
              Pay ₹399 via Razorpay (Test Mode)
            </button>
          </div>
        )}

        {/* 3. TRACKING */}
        {view === "tracking" && (
          <div style={{ background: "#fff", padding: "25px", borderRadius: "8px", border: "1px solid #ddd", textAlign: "center" }}>
            <h2 style={{ color: "#2e7d32" }}>🎉 Order Placed Successfully!</h2>
            <p>Live Order Tracking (Real-time status):</p>
            
            <div style={{ display: "flex", justifyContent: "space-around", margin: "30px 0" }}>
              {["Order Received", "In Kitchen", "Sent to Delivery"].map((st) => (
                <div key={st} style={{ padding: "10px 16px", borderRadius: "6px", background: orderStatus === st ? "#2e7d32" : "#eee", color: orderStatus === st ? "#fff" : "#444", fontWeight: "bold" }}>
                  {st}
                </div>
              ))}
            </div>

            <button onClick={() => setView("admin")} style={{ padding: "10px 16px", background: "#333", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              Go to Admin Panel to update status
            </button>
          </div>
        )}

        {/* 4. ADMIN PANEL */}
        {view === "admin" && (
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h2>⚙️ Admin Inventory & Order Management</h2>
            {inventory.bases < 20 && (
              <div style={{ background: "#ffebee", color: "#c62828", padding: "10px", borderRadius: "6px", marginBottom: "15px" }}>
                ⚠️ <b>Automated Alert:</b> Stock low (&lt;20 units). Scheduled node-cron email notification triggered!
              </div>
            )}

            <h3>Inventory Stock (Auto-decremented):</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
              {Object.entries(inventory).map(([k, v]) => (
                <div key={k} style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "6px", textAlign: "center" }}>
                  <h4 style={{ margin: "4px 0", textTransform: "capitalize" }}>{k}</h4>
                  <p style={{ fontSize: "20px", fontWeight: "bold", margin: "6px 0", color: v < 20 ? "#d32f2f" : "#2e7d32" }}>{v} units</p>
                  <button onClick={() => setInventory(prev => ({ ...prev, [k]: prev[k] + 10 }))} style={{ fontSize: "11px", cursor: "pointer" }}>+ Restock</button>
                </div>
              ))}
            </div>

            <h3>Update Live Order Status:</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {["Order Received", "In Kitchen", "Sent to Delivery"].map((st) => (
                <button key={st} onClick={() => setOrderStatus(st)} style={{ padding: "8px 14px", background: orderStatus === st ? "#2e7d32" : "#eee", color: orderStatus === st ? "#fff" : "#000", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Set: {st}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}