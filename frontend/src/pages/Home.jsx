import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Каталог</h1>
      {products.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.price} грн</p>
        </div>
      ))}
    </div>
  );
}
