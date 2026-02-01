import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";

export default function Cart() {
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div>
      <h1>Корзина</h1>
      {cart.map(i => (
        <div key={i._id}>
          {i.title} × {i.qty}
          <button onClick={() => dispatch(removeFromCart(i._id))}>❌</button>
        </div>
      ))}
      <h2>Итого: {total} грн</h2>
      <button onClick={() => dispatch(clearCart())}>Очистить</button>
    </div>
  );
}
