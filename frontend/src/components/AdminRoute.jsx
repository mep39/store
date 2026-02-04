export default function AdminRoute({ children }) {
  const role = localStorage.getItem("role");
  if (role !== "admin") return <h2>403 Forbidden</h2>;
  return children;
}
