import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: "Bearer " + localStorage.token }
    })
      .then(r => r.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h1>Админка</h1>
      {orders.map(o => (
        <div key={o._id}>
          Заказ {o._id} — {o.status}
        </div>
      ))}
    </div>
  );
}
