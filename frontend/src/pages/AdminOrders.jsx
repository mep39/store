import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders", {
      headers: { Authorization: "Bearer " + localStorage.token }
    })
      .then(r => r.json())
      .then(setOrders);
  }, []);

  async function createTTN(id) {
    await fetch(`/api/admin/orders/${id}/ttn`, {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.token }
    });
    alert("ТТН створено");
  }

  return (
    <div>
      <h1>Замовлення</h1>
      {orders.map(o => (
        <div key={o._id}>
          <b>{o._id}</b> — {o.status}
          {o.status === "paid" && (
            <button onClick={() => createTTN(o._id)}>
              Створити ТТН
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
