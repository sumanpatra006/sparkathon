"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/api/api";
import categories from "@/data/products";
import { toast, Toaster } from "react-hot-toast";

function getOriginalImage(productId) {
  for (const cat of categories) {
    for (const item of cat.items) {
      if (item.productId === productId) {
        return item.image;
      }
    }
  }
  return undefined;
}

export default function VerificationAnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [actionResult, setActionResult] = useState(null);
  const [showRefund, setShowRefund] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await api.get(`/v1/admin/return/${id}`);
        setDetails(res.data.return);
      } catch (err) {
        toast.error("Failed to fetch return details");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleAdminAction = async (status) => {
    if (!adminMessage.trim()) {
      toast.error("Please enter a message before taking action.");
      return;
    }
    setActionLoading(true);
    setActionResult(null);
    try {
      const payload = {
        riskLevel: details.riskLevel,
        action: status === "Refunded" ? "refund" : status.toLowerCase(),
        refundAmount: status === "Refunded" ? Number(refundAmount) : undefined,
        status,
        message: adminMessage,
      };
      const res = await api.put(`/v1/admin/return/${id}`, payload);
      toast.success(res.data.message || "Return status updated");
      setActionResult(res.data);
      setTimeout(() => router.push("/admin/dashboard?tab=verification"), 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update return");
    } finally {
      setActionLoading(false);
    }
  };

  let originalImage = undefined;
  let firstProduct = details?.order?.items?.[0];
  if (firstProduct) {
    originalImage = getOriginalImage(firstProduct.productId);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-blue to-white flex flex-col items-center py-12 px-4">
      <Toaster />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-walmart-blue text-2xl font-bold"
          onClick={() => router.back()}
          aria-label="Back"
        >
          ←
        </button>
        {loading ? (
          <div className="text-center text-walmart-blue text-lg py-12">
            Loading return details...
          </div>
        ) : details ? (
          <>
            <h1 className="text-3xl font-bold text-walmart-blue mb-4">
              Image Verification & Analysis
            </h1>
            <div className="flex gap-6 mb-6 justify-center">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Original</span>
                <img
                  src={originalImage || "https://via.placeholder.com/120"}
                  alt="Original Product"
                  className="rounded w-32 h-32 object-cover border"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Returned</span>
                <img
                  src={details.imageUrl || "https://via.placeholder.com/120"}
                  alt="Return"
                  className="rounded w-32 h-32 object-cover border"
                />
              </div>
            </div>
            <div className="font-bold text-gray-900 mb-2 text-center text-xl">
              {firstProduct?.name}
            </div>
            <div className="text-xs text-gray-700 mb-2 text-center">
              Return ID: {details._id}
            </div>
            <div className="text-xs text-gray-700 mb-2 text-center">
              Risk:{" "}
              <span
                className={`font-bold ${
                  details.riskLevel === "High"
                    ? "text-red-600"
                    : details.riskLevel === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {details.riskLevel}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-4 w-full">
              <div>
                Blur: <span className="font-bold">{details.blurScore}</span>
              </div>
              <div>
                SSIM: <span className="font-bold">{details.ssimScore}</span>
              </div>
              <div>
                Metadata:{" "}
                <span className="font-bold">{details.metadataScore}</span>
              </div>
              <div>
                Final: <span className="font-bold">{details.finalScore}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="font-bold text-walmart-dark-blue mb-2">
                Order Info
              </div>
              <div className="text-xs text-gray-700 mb-1">
                Order ID: {details.order?._id}
              </div>
              <div className="text-xs text-gray-700 mb-1">
                Order Status: {details.order?.status}
              </div>
              <div className="text-xs text-gray-700 mb-1">
                Order Date:{" "}
                {details.order?.orderDate
                  ? new Date(details.order.orderDate).toLocaleString()
                  : ""}
              </div>
              <div className="text-xs text-gray-700 mb-1">
                Total: ₹{details.order?.totalAmount}
              </div>
              <div className="text-xs text-gray-700 mb-1">
                Items: {details.order?.items?.map((i) => i.name).join(", ")}
              </div>
            </div>
            <textarea
              className="w-full rounded border border-gray-300 p-2 text-sm text-gray-900 mb-4"
              placeholder="Enter a message for the user (required)"
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              required
            />
            <div className="flex gap-2 mb-2">
              <button
                className="btn-primary"
                disabled={actionLoading || !adminMessage.trim()}
                onClick={() => handleAdminAction("Approved")}
              >
                Approve
              </button>
              <button
                className="btn-secondary"
                disabled={actionLoading || !adminMessage.trim()}
                onClick={() => handleAdminAction("Rejected")}
              >
                On Store 
                Inspection
              </button>
              <button
                className="btn-secondary"
                disabled={actionLoading || !adminMessage.trim()}
                onClick={() => setShowRefund(true)}
              >
                Partial 
                Refund
              </button>
            </div>
            {showRefund && (
              <div className="flex flex-col gap-2 mb-2 text-black">
                <input
                  type="number"
                  min="1"
                  placeholder="Refund Amount"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="border rounded px-2 py-1 mb-2 w-full"
                />
                <button
                  className="btn-primary w-full"
                  disabled={
                    actionLoading || !adminMessage.trim() || !refundAmount
                  }
                  onClick={() => handleAdminAction("Refunded")}
                >
                  Confirm Refund
                </button>
              </div>
            )}
            {actionResult && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <div className="font-bold text-walmart-blue mb-1">
                  {actionResult.userMessage}
                </div>
                {actionResult.qrCodeUrl && (
                  <img
                    src={actionResult.qrCodeUrl}
                    alt="QR Code"
                    className="w-32 h-32 mt-2"
                  />
                )}
                {actionResult.refundAmount && (
                  <div className="text-green-700 font-bold mt-2">
                    Refund: ₹{actionResult.refundAmount}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500">No details found.</div>
        )}
      </div>
    </div>
  );
}
