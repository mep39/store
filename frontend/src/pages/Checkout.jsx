import api from "../services/api";

export default function Checkout() {
  const submit = async () => {
    const order = await api.post("/orders", {
      email: "client@mail.com",
      phone: "+380000000",
      items: [{ title: "Товар", price: 100, qty: 1 }],
      total: 100,
      delivery: { city: "Київ", warehouse: "1" },
      payment: { method: "wayforpay" }
    });

    alert("Замовлення створено: " + order.data._id);
  };

  return <button onClick={submit}>Оформити замовлення</button>;
}
