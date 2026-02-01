import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();

  async function submit() {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      body: JSON.stringify({
        items: cart,
        total: cart.reduce((s, i) => s + i.price * i.qty, 0)
      })
    });
    dispatch(clearCart());
    alert("Заказ оформлен");
  }

  return <button onClick={submit}>Оформить заказ</button>;
}

import { useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cart = useSelector(s => s.cart);
  const [city, setCity] = useState("");

  async function pay() {
    const orderRes = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      body: JSON.stringify({
        items: cart,
        total: cart.reduce((s, i) => s + i.price * i.qty, 0),
        delivery: { city }
      })
    });

    const order = await orderRes.json();

    const payRes = await fetch("/api/payment/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      body: JSON.stringify({ orderId: order._id })
    });

    const data = await payRes.json();
    window.Wayforpay.run(data);
  }

  return (
    <>
      <input
        placeholder="Город"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button onClick={pay}>Оплатить</button>
    </>
  );
}