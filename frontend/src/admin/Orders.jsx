import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Замовлення</h2>
      {orders.map(o => (
        <div key={o._id}>
          {o._id} — {o.status}
        </div>
      ))}
    </div>
  );
}
