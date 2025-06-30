"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../api/api";
import categories from "../../data/products";

export default function InventoryPage() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setShowPopup(false);
    toast.success("Added to cart");
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setIsOrdering(true);
    try {
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const res = await api.post("/api/v1/orders/new", {
        items: cart,
        totalAmount,
      });
      toast.success(res.data.message || "Order Created Successfully");
      setCart([]);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="container-responsive mx-auto py-12 px-4 bg-[#f6f7fa] min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold text-walmart-blue mb-8">
        Shop by Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-2xl shadow-lg p-6 border border-[#e0e0e0]"
          >
            <h2 className="text-xl font-semibold mb-4 text-walmart-dark-blue">
              {cat.name}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {cat.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-xl p-4 bg-[#f9fafb] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-[#e0e0e0] bg-white"
                    />
                    <div>
                      <div className="font-semibold text-lg text-walmart-dark-blue">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {item.productId}
                      </div>
                      <div className="text-sm text-gray-700">
                        Price:{" "}
                        <span className="text-walmart-blue font-bold">
                          ₹{item.price}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <button
                    className="border border-walmart-blue text-walmart-blue font-semibold rounded-full px-6 py-2 mt-4 md:mt-0 hover:bg-walmart-blue hover:text-white transition-colors"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowPopup(true);
                    }}
                  >
                    Options
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-[#e0e0e0]">
        <h2 className="text-xl font-semibold mb-4 text-walmart-dark-blue">
          Cart
        </h2>
        {cart.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <ul className="mb-4">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span className="text-walmart-blue font-bold">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn-primary w-full mt-2"
          onClick={handleOrder}
          disabled={isOrdering || cart.length === 0}
        >
          {isOrdering ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* Purchase Popup */}
      {showPopup && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md border border-[#e0e0e0]">
            <h3 className="text-xl font-bold mb-4 text-walmart-blue">
              Purchase {selectedItem.name}
            </h3>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-32 h-32 object-cover rounded-lg mx-auto mb-4 border border-[#e0e0e0] bg-white"
            />
            <div className="mb-2 text-center text-gray-700">
              Price:{" "}
              <span className="text-walmart-blue font-bold">
                ₹{selectedItem.price}
              </span>
            </div>
            <div className="mb-4 text-center text-gray-700">
              Quantity: {selectedItem.quantity}
            </div>
            <button
              className="btn-primary w-full mb-2"
              onClick={() => handleAddToCart(selectedItem)}
            >
              Add to Cart
            </button>
            <button
              className="btn-ghost w-full"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
