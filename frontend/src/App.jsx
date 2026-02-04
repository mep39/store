import AdminOrders from "./admin/Orders";
import AdminRoute from "./components/AdminRoute";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <> <h1>Store frontend is working 🚀</h1>;
      <Checkout />
      <AdminRoute>
        <AdminOrders />
      </AdminRoute>
    </>
  );
}
