"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../api/api";
import categories from "../../data/products";

export default function InventoryPage() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupQuantity, setPopupQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setPopupQuantity(1);
    setShowPopup(true);
  };

  const handleAddToCart = () => {
    setCart((prev) => {
      const found = prev.find((i) => i.productId === selectedItem.productId);
      if (found) {
        return prev.map((i) =>
          i.productId === selectedItem.productId
            ? { ...i, quantity: i.quantity + popupQuantity }
            : i
        );
      }
      return [...prev, { ...selectedItem, quantity: popupQuantity }];
    });
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
      const res = await api.post("/v1/orders/new", {
        items: cart.map(({ name, productId, price, quantity }) => ({
          name,
          productId,
          price,
          quantity,
        })),
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

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  return (
    <div className="container-responsive mx-auto py-12 px-4 bg-[#f6f7fa] min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold text-walmart-blue mb-8 text-center">
        Shop by Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h2 className="text-xl font-semibold mb-4 text-walmart-dark-blue text-center">
              {cat.name}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {cat.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-xl p-4 bg-[#f9fafb] hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleItemClick(item)}
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
                        Stock: {item.quantity}
                      </div>
                    </div>
                  </div>
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
                key={item.productId}
                className="flex justify-between items-center border-b py-2 text-black"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span className=" font-bold text-black">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="ml-4 text-red-500 hover:underline"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove
                </button>
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
              Stock: {selectedItem.quantity}
            </div>
            <div className="mb-4 text-center">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={selectedItem.quantity}
                value={popupQuantity}
                onChange={(e) =>
                  setPopupQuantity(
                    Math.max(
                      1,
                      Math.min(selectedItem.quantity, Number(e.target.value))
                    )
                  )
                }
                className="w-24 border rounded px-2 py-1 text-center text-black"
              />
            </div>
            <button
              className="btn-primary w-full mb-2"
              onClick={handleAddToCart}
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
