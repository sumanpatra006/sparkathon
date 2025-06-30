"use client";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../api/api";

export default function ReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReturnId, setSelectedReturnId] = useState(null);
  const [returnDetails, setReturnDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    async function fetchReturns() {
      setLoading(true);
      try {
        const res = await api.get("/api/v1/returns/user");
        setReturns(res.data.returns || []);
      } catch (err) {
        toast.error("Failed to fetch return summaries");
      } finally {
        setLoading(false);
      }
    }
    fetchReturns();
  }, []);

  const handleReturnClick = async (returnId) => {
    setSelectedReturnId(returnId);
    setReturnDetails(null);
    setDetailsLoading(true);
    try {
      const res = await api.get(`/api/v1/returns/${returnId}`);
      setReturnDetails(res.data.returnOrder);
    } catch (err) {
      toast.error("Failed to fetch return details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCancelReturn = async () => {
    if (!selectedReturnId) return;
    try {
      const res = await api.put(`/api/v1/returns/${selectedReturnId}/cancel`);
      toast.success(res.data.message || "Return request cancelled");
      // Refresh details and list
      if (returnDetails) {
        setReturnDetails({ ...returnDetails, status: "Cancelled" });
      }
      setReturns((prev) =>
        prev.map((r) =>
          r._id === selectedReturnId ? { ...r, status: "Cancelled" } : r
        )
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to cancel return");
    }
  };

  const closeModal = () => {
    setSelectedReturnId(null);
    setReturnDetails(null);
  };

  return (
    <div className="container-responsive mx-auto py-12 px-4 bg-[#f6f7fa] min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold text-walmart-blue mb-8">
        My Return Summaries
      </h1>
      {loading ? (
        <div className="text-center text-walmart-blue text-lg">
          Loading returns...
        </div>
      ) : returns.length === 0 ? (
        <div className="text-center text-gray-500">
          No return requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {returns.map((ret) => (
            <button
              key={ret._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[#e0e0e0] text-left hover:shadow-xl transition-shadow focus:outline-none"
              onClick={() => handleReturnClick(ret._id)}
            >
              <h2 className="text-xl font-semibold mb-2 text-walmart-dark-blue">
                Return #{ret._id.slice(-6)}
              </h2>
              <div className="mb-2 text-gray-700">
                Status:{" "}
                <span className="font-bold text-walmart-blue">
                  {ret.status}
                </span>
              </div>
              <div className="mb-2 text-gray-700">
                Risk Level: <span className="font-bold">{ret.riskLevel}</span>
              </div>
              <div className="mb-2 text-gray-700">
                Reason: <span className="font-normal">{ret.reason}</span>
              </div>
              <div className="mb-2 text-gray-700">
                Return Date: {new Date(ret.returnDate).toLocaleString()}
              </div>
              <div className="mb-2 text-gray-700">
                Blur Score: {ret.blurScore}
              </div>
              <div className="mb-2 text-gray-700">
                SSIM Score: {ret.ssimScore}
              </div>
              <div className="mb-2 text-gray-700">
                Metadata Score: {ret.metadataScore}
              </div>
              <div className="mb-2 text-gray-700">
                Final Score: {ret.finalScore}
              </div>
              {ret.imageUrl && (
                <img
                  src={ret.imageUrl}
                  alt="Return"
                  className="w-32 h-32 object-cover rounded-lg border mt-2"
                />
              )}
              {ret.order && (
                <div className="mt-4 bg-[#f6f7fa] rounded-lg p-4 border">
                  <div className="font-semibold text-walmart-dark-blue mb-1">
                    Order Info
                  </div>
                  <div className="text-xs text-gray-500">
                    Order ID: {ret.order._id}
                  </div>
                  <div className="text-xs text-gray-500">
                    Order Status: {ret.order.status}
                  </div>
                  <div className="text-xs text-gray-500">
                    Order Date: {new Date(ret.order.orderDate).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total: ₹{ret.order.totalAmount}
                  </div>
                  <div className="text-xs text-gray-500">
                    Items: {ret.order.items.map((i) => i.name).join(", ")}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Return Details Modal */}
      {selectedReturnId && (
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
                Loading return details...
              </div>
            ) : returnDetails ? (
              <>
                <h2 className="text-2xl font-bold mb-2 text-walmart-blue">
                  Return Details
                </h2>
                <div className="mb-2 text-gray-700">
                  Return ID:{" "}
                  <span className="font-mono">{returnDetails._id}</span>
                </div>
                <div className="mb-2 text-gray-700">
                  Status:{" "}
                  <span className="font-bold text-walmart-blue">
                    {returnDetails.status}
                  </span>
                </div>
                <div className="mb-2 text-gray-700">
                  Risk Level:{" "}
                  <span className="font-bold">{returnDetails.riskLevel}</span>
                </div>
                <div className="mb-2 text-gray-700">
                  Reason:{" "}
                  <span className="font-normal">{returnDetails.reason}</span>
                </div>
                <div className="mb-2 text-gray-700">
                  Return Date:{" "}
                  {new Date(returnDetails.returnDate).toLocaleString()}
                </div>
                <div className="mb-2 text-gray-700">
                  Blur Score: {returnDetails.blurScore}
                </div>
                <div className="mb-2 text-gray-700">
                  SSIM Score: {returnDetails.ssimScore}
                </div>
                <div className="mb-2 text-gray-700">
                  Metadata Score: {returnDetails.metadataScore}
                </div>
                <div className="mb-2 text-gray-700">
                  Final Score: {returnDetails.finalScore}
                </div>
                {returnDetails.imageUrl && (
                  <img
                    src={returnDetails.imageUrl}
                    alt="Return"
                    className="w-32 h-32 object-cover rounded-lg border mt-2"
                  />
                )}
                {returnDetails.order && (
                  <div className="mt-4 bg-[#f6f7fa] rounded-lg p-4 border">
                    <div className="font-semibold text-walmart-dark-blue mb-1">
                      Order Info
                    </div>
                    <div className="text-xs text-gray-500">
                      Order ID: {returnDetails.order._id}
                    </div>
                    <div className="text-xs text-gray-500">
                      Order Status: {returnDetails.order.status}
                    </div>
                    <div className="text-xs text-gray-500">
                      Order Date:{" "}
                      {new Date(returnDetails.order.orderDate).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Total: ₹{returnDetails.order.totalAmount}
                    </div>
                    <div className="text-xs text-gray-500">
                      Items:{" "}
                      {returnDetails.order.items.map((i) => i.name).join(", ")}
                    </div>
                  </div>
                )}
                <button
                  className="btn-secondary w-full mt-4"
                  onClick={handleCancelReturn}
                  disabled={
                    returnDetails.status === "Cancelled" ||
                    returnDetails.status === "Completed"
                  }
                >
                  {returnDetails.status === "Cancelled"
                    ? "Request Cancelled"
                    : "Cancel Return Request"}
                </button>
              </>
            ) : (
              <div className="text-center text-gray-500">No details found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
