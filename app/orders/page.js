"use client";
import { useEffect, useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../api/api";
import categories from "../../data/products";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnItem, setReturnItem] = useState(null);
  const [returnOrderId, setReturnOrderId] = useState(null);
  const [returnStatus, setReturnStatus] = useState(null);
  const [returnLoading, setReturnLoading] = useState(false);
  const userImageInput = useRef();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await api.get("/v1/orders/user-orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleOrderClick = async (orderId) => {
    setSelectedOrderId(orderId);
    setOrderDetails(null);
    setDetailsLoading(true);
    try {
      const res = await api.get(`/v1/orders/${orderId}`);
      setOrderDetails(res.data.order);
    } catch (err) {
      toast.error("Failed to fetch order details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedOrderId(null);
    setOrderDetails(null);
  };

  // Helper to get image by productId
  function getProductImage(productId) {
    for (const cat of categories) {
      const found = cat.items.find((item) => item.productId === productId);
      if (found) {
        return found.image;
      }
    }
    return "";
  }

  // Open return modal for a specific item
  const handleReturnClick = (orderId, item) => {
    setReturnOrderId(orderId);
    // Attach image from product catalog
    setReturnItem({ ...item, image: getProductImage(item.productId) });
    setReturnStatus(null);
    setShowReturnModal(true);
  };

  // Submit return request
  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    setReturnLoading(true);
    setReturnStatus(null);
    const form = e.target;
    const formData = new FormData();
    formData.append("orderId", returnOrderId);
    formData.append("reason", form.reason.value);
    formData.append("deliveryCount", form.deliveryCount.value);
    formData.append("returnDelayDays", form.returnDelayDays.value);
    if (userImageInput.current.files[0]) {
      formData.append("user_image", userImageInput.current.files[0]);
    } else {
      toast.error("Please upload a product condition photo.");
      setReturnLoading(false);
      return;
    }
    // Fetch the warehouse image as a file
    const warehouseImageUrl = returnItem.image || "";
    if (!warehouseImageUrl) {
      toast.error("Warehouse image not found.");
      setReturnLoading(false);
      return;
    }
    try {
      const response = await fetch(warehouseImageUrl);
      const blob = await response.blob();
      const fileName =
        warehouseImageUrl.split("/").pop().split("?")[0] ||
        "warehouse_image.jpg";
      const warehouseFile = new File([blob], fileName, { type: blob.type });
      formData.append("warehouse_image", warehouseFile);
    } catch (err) {
      toast.error("Failed to fetch warehouse image.");
      setReturnLoading(false);
      return;
    }
    try {
      const res = await api.post("/v1/returns/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setReturnStatus(res.data.return);
      toast.success(
        res.data.message || "Return Request Created Successfully!!"
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Return request failed");
    } finally {
      setReturnLoading(false);
    }
  };

  return (
    <div className="container-responsive mx-auto py-12 px-4 bg-[#f6f7fa] min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold text-walmart-blue mb-8">My Orders</h1>
      {loading ? (
        <div className="text-center text-walmart-blue text-lg">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible scrollbar-thin scrollbar-thumb-walmart-blue scrollbar-track-gray-200"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[#e0e0e0] text-left"
            >
              <h2 className="text-xl font-semibold mb-2 text-walmart-dark-blue">
                Order #{order._id.slice(-6)}
              </h2>
              <div className="mb-2 text-gray-700">
                Status:{" "}
                <span className="font-bold text-walmart-blue">
                  {order.status}
                </span>
              </div>
              <div className="mb-2 text-gray-700">
                Order Date: {new Date(order.orderDate).toLocaleString()}
              </div>
              <div className="mb-2 text-gray-700">
                Total Amount:{" "}
                <span className="font-bold text-walmart-blue">
                  ₹{order.totalAmount}
                </span>
              </div>
              <div className="mb-2 text-gray-700 font-semibold">Items:</div>
              <ul className="mb-2 pl-4 list-disc text-gray-600">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <span>
                      {item.name} (x{item.quantity}) - ₹{item.price}
                    </span>
                    <button
                      className="btn-secondary mt-2 md:mt-0"
                      onClick={() => handleReturnClick(order._id, item)}
                    >
                      Return
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-gray-400">Order ID: {order._id}</div>
              <button
                className="mt-4 w-full btn-primary"
                onClick={() => handleOrderClick(order._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-lg border border-[#e0e0e0] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-walmart-blue text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            {detailsLoading ? (
              <div className="text-center text-walmart-blue text-lg">
                Loading order details...
              </div>
            ) : orderDetails ? (
              <>
                <h2 className="text-2xl font-bold mb-2 text-walmart-blue">
                  Order Details
                </h2>
                <div className="mb-2 text-gray-700">
                  Order ID:{" "}
                  <span className="font-mono">{orderDetails._id}</span>
                </div>
                <div className="mb-2 text-gray-700">
                  Status:{" "}
                  <span className="font-bold text-walmart-blue">
                    {orderDetails.status}
                  </span>
                </div>
                <div className="mb-2 text-gray-700">
                  Order Date:{" "}
                  {new Date(orderDetails.orderDate).toLocaleString()}
                </div>
                <div className="mb-2 text-gray-700">
                  Total Amount:{" "}
                  <span className="font-bold text-walmart-blue">
                    ₹{orderDetails.totalAmount}
                  </span>
                </div>
                <div className="mb-2 text-gray-700 font-semibold">Items:</div>
                <ul className="mb-2 pl-4 list-disc text-gray-600">
                  {orderDetails.items.map((item) => (
                    <li key={item._id}>
                      {item.name} (x{item.quantity}) - ₹{item.price}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-400">
                  User ID: {orderDetails.user}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">No details found.</div>
            )}
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && returnItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-lg border border-[#e0e0e0] relative overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-walmart-blue text-2xl font-bold"
              onClick={() => setShowReturnModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-walmart-blue">
              Return Item: {returnItem.name}
            </h2>
            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-walmart-dark-blue mb-1">
                  Reason for Return
                </label>
                <input
                  name="reason"
                  required
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  placeholder="Enter reason"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-walmart-dark-blue mb-1">
                  Delivery Count
                </label>
                <input
                  name="deliveryCount"
                  type="number"
                  min="1"
                  required
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  placeholder="Number of delivered items"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-walmart-dark-blue mb-1">
                  Return Delay Days
                </label>
                <input
                  name="returnDelayDays"
                  type="number"
                  min="0"
                  required
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  placeholder="Days since delivery"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-walmart-dark-blue mb-1">
                  Upload Product Condition Photo
                </label>
                <input
                  name="user_image"
                  type="file"
                  accept="image/*"
                  ref={userImageInput}
                  required
                  className="w-full text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-walmart-dark-blue mb-1">
                  Warehouse Image (Original)
                </label>
                <img
                  src={
                    returnItem.image ||
                    "https://via.placeholder.com/100x100?text=No+Image"
                  }
                  alt="Warehouse"
                  className="w-32 h-32 object-cover rounded-lg border mt-2"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={returnLoading}
              >
                {returnLoading ? "Submitting..." : "Submit Return Request"}
              </button>
            </form>
            {returnStatus && (
              <div className="mt-6 bg-[#f6f7fa] rounded-lg p-4 border border-walmart-blue text-black">
                <h3 className="text-lg font-bold text-walmart-blue mb-2">
                  Return Status
                </h3>
                <div className="mb-1 ">
                  Status:{" "}
                  <span className="font-bold">{returnStatus.status}</span>
                </div>
                <div className="mb-1">
                  Risk Level:{" "}
                  <span className="font-bold">{returnStatus.riskLevel}</span>
                </div>
                <div className="mb-1">Blur Score: {returnStatus.blurScore}</div>
                <div className="mb-1">SSIM Score: {returnStatus.ssimScore}</div>
                <div className="mb-1">
                  Metadata Score: {returnStatus.metadataScore}
                </div>
                <div className="mb-1">
                  Final Score: {returnStatus.finalScore}
                </div>
                <div className="mb-1">
                  Return Date:{" "}
                  {new Date(returnStatus.returnDate).toLocaleString()}
                </div>
                <img
                  src={returnStatus.imageUrl}
                  alt="Return"
                  className="w-32 h-32 object-cover rounded-lg border mt-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
