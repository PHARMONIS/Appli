import React, { useState } from "react";

function App() {
  const [customers, setCustomers] = useState([
    { name: "Nithin", phone: "8075453699", amount: 400, paid: false },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", amount: "" });

  const upiID = "0799206A0225812.bqr@kotak";
  const businessName = "PHARMONIS PHARMA";

  const generateUPILink = (amount) => {
    return \`upi://pay?pa=\${upiID}&pn=\${encodeURIComponent(businessName)}&am=\${amount}&cu=INR\`;
  };

  const sendWhatsAppMessage = (customer) => {
    const message = \`Hi \${customer.name},%0A%0AThis is a reminder from \${businessName}. ₹\${customer.amount} is pending on your account.%0A%0APlease pay using the link below:%0A\${generateUPILink(customer.amount)}%0A%0AThank you,%0A\${businessName}\`;
    const whatsappURL = \`https://wa.me/91\${customer.phone}?text=\${message}\`;
    window.open(whatsappURL, "_blank");
  };

  const markAsPaid = (index) => {
    const updated = [...customers];
    updated[index].paid = true;
    setCustomers(updated);
  };

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.amount) return;
    setCustomers([...customers, { ...newCustomer, paid: false, amount: parseFloat(newCustomer.amount) }]);
    setNewCustomer({ name: "", phone: "", amount: "" });
  };

  return (
    <div style={{ padding: 16, maxWidth: 500, margin: "auto" }}>
      <h2>Credit Payment Reminder</h2>
      <input placeholder="Customer Name" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} /><br />
      <input placeholder="Phone Number" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} /><br />
      <input placeholder="Amount Due" type="number" value={newCustomer.amount} onChange={(e) => setNewCustomer({ ...newCustomer, amount: e.target.value })} /><br />
      <button onClick={addCustomer}>Add Customer</button>

      {customers.map((customer, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginTop: 12, padding: 12 }}>
          <div><strong>{customer.name}</strong> (📞 {customer.phone})</div>
          <div>Amount: ₹{customer.amount}</div>
          <div>Status: {customer.paid ? "✅ Paid" : "❌ Unpaid"}</div>
          <button onClick={() => sendWhatsAppMessage(customer)}>Send Reminder</button>
          {!customer.paid && <button onClick={() => markAsPaid(index)}>Mark as Paid</button>}
        </div>
      ))}
    </div>
  );
}

export default App;
