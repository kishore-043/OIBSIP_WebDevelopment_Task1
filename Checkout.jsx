import React, { useState } from 'react';

function Checkout({ cart = [], clearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fallback demo items if cart is empty directly in url test
const savedLocal = localStorage.getItem("pizza_cart");
const localCart = savedLocal ? JSON.parse(savedLocal) : [];
const displayCart = cart && cart.length > 0 ? cart : localCart;

  const subtotal = displayCart.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in Name, Phone Number, and Delivery Address!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address
          },
          items: displayCart,
          totalAmount: grandTotal
        })
      });

      const data = await res.json();
      console.log('Saved to DB:', data);

      setOrderPlaced(true);
      if (clearCart) clearCart();
      localStorage.removeItem("pizza_cart");
    } catch (err) {
      console.error('Save error:', err);
      setOrderPlaced(true);
      if (clearCart) clearCart();
    } finally {
      setLoading(false);
    }
  };
  if (orderPlaced) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={{ color: '#27ae60', margin: '10px 0' }}>Order Placed Successfully!</h2>
          <p style={{ color: '#555', fontSize: '15px' }}>
            Thank you, <b>{formData.name}</b>! Your delicious pizza is being prepared and will be delivered soon to:
          </p>
          <div style={styles.addressBox}>
            📍 {formData.address}
          </div>
          <p style={{ marginTop: '15px', color: '#777', fontSize: '14px' }}>
            Phone: <b>{formData.phone}</b> | Total: <b>₹{grandTotal}</b>
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={styles.backHomeBtn}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <span style={styles.logo}>🍕 PizzaHub</span>
          <span style={styles.badge}>Fast Delivery • Fresh Taste</span>
        </div>
      </header>

      <main style={styles.mainContainer}>
        <div style={styles.layoutGrid}>
          {/* Left Side: Delivery Details */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Delivery Details</h2>
            <p style={styles.subtitle}>Please provide your delivery information below.</p>

            <form onSubmit={handlePlaceOrder} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Kishore Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Delivery Address</label>
                <textarea
                  name="address"
                  rows="3"
                  placeholder="House No, Street, Landmark, City..."
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.textarea}
                  required
                />
              </div>

              <div style={styles.paymentNote}>
                💵 Payment Method: <b>Cash on Delivery (COD) / UPI on Delivery</b>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={loading ? { ...styles.placeOrderBtn, opacity: 0.7 } : styles.placeOrderBtn}
              >
                {loading ? 'Placing Order...' : `Place Order (₹${grandTotal})`}
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Order Summary</h2>
            <div style={styles.summaryList}>
              {displayCart.map((item, index) => (
                <div key={item.id || index} style={styles.summaryItem}>
                  <div>
                    <span style={styles.itemName}>🍕 {item.name}</span>
                    <span style={styles.itemQty}> x {item.quantity || 1}</span>
                  </div>
                  <span style={styles.itemPrice}>
                    ₹{(Number(item.price) || 0) * (item.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.divider}></div>

            <div style={styles.priceRow}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div style={{ ...styles.priceRow, ...styles.grandTotalRow }}>
              <span>Total Payable</span>
              <span style={styles.grandTotalPrice}>₹{grandTotal}</span>
            </div>

            <div style={styles.safetyBadge}>
              🛡️ 100% Contactless & Safe Delivery
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  pageBackground: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: '#333'
  },
  header: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    padding: '16px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  badge: {
    fontSize: '13px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '5px 12px',
    borderRadius: '20px'
  },
  mainContainer: {
    maxWidth: '1000px',
    margin: '35px auto',
    padding: '0 16px'
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    alignItems: 'start'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
    border: '1px solid #eee'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#222',
    marginBottom: '6px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444'
  },
  input: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  paymentNote: {
    backgroundColor: '#fff8e1',
    border: '1px solid #ffe082',
    color: '#795548',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px'
  },
  placeOrderBtn: {
    backgroundColor: '#e64a19',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'background-color 0.2s'
  },
  summaryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '15px'
  },
  itemName: {
    fontWeight: '600',
    color: '#333'
  },
  itemQty: {
    color: '#888',
    fontSize: '13px'
  },
  itemPrice: {
    fontWeight: '600',
    color: '#222'
  },
  divider: {
    height: '1px',
    backgroundColor: '#eee',
    margin: '18px 0'
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px'
  },
  grandTotalRow: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#222',
    marginTop: '12px',
    paddingTop: '10px',
    borderTop: '2px dashed #ddd'
  },
  grandTotalPrice: {
    color: '#d32f2f'
  },
  safetyBadge: {
    marginTop: '20px',
    padding: '10px',
    textAlign: 'center',
    fontSize: '13px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '6px'
  },
  successContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '36px 28px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
  },
  successIcon: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  addressBox: {
    backgroundColor: '#f1f3f4',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '12px',
    fontSize: '14px',
    color: '#333'
  },
  backHomeBtn: {
    marginTop: '24px',
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default Checkout;