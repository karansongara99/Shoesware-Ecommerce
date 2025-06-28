import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setError("You need to log in to view your orders.");
      setLoading(false);
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Orders</h2>

      {loading && <p className="text-center">Loading your orders...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {orders.length === 0 && !loading && !error && (
        <p className="text-center">You have no orders yet.</p>
      )}

      {orders.length > 0 && (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card border-0 shadow-lg p-4">
                <h5 className="fw-bold">Order ID: {order._id}</h5>
                <p className="mb-1"><strong>Order Date:</strong> {formatDate(order.OrderDate)}</p>
                <p className="mb-1"><strong>Total Amount:</strong> ₹{order.TotalAmount}</p>
                <p className="mb-1"><strong>Status:</strong> {order.status}</p>

                <h6 className="mt-3">Products:</h6>
                <ul className="list-group list-group-flush">
                  {order.ProductItems.map((item) => (
                    <li key={item.ProductID} className="list-group-item px-0">
                      {item.ProductID.ProductName} (x{item.ProductQuantity}) - ₹
                      {item.ProductID.ProductPrice * item.ProductQuantity}
                    </li>
                  ))}
                </ul>

                {/* Status Messages */}
                {order.status === "Pending" && (
                  <p className="text-warning fw-bold mt-2">Your order is still pending.</p>
                )}

                {order.status === "Delivered" && (
                  <p className="text-success fw-bold mt-2">Your order has been delivered.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
