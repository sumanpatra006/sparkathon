import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ImageVerificationList({
  items,
  onApprove,
  onReject,
  onRefund,
}) {
  const [localItems, setLocalItems] = useState(items);
  useEffect(() => {
    setLocalItems(items);
  }, [items]);
  const router = useRouter();

  const handleAction = async (type, id) => {
    let result;
    if (type === "approve") result = await onApprove(id);
    if (type === "reject") result = await onReject(id);
    if (type === "refund") result = await onRefund(id);
    if (result && result.success) {
      setLocalItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {localItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm cursor-pointer hover:shadow-lg transition"
          onClick={() => router.push(`/admin/verification/${item.id}`)}
        >
          <div className="flex gap-4 w-full justify-center mb-4">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Original</span>
              <img
                src={item.originalImage || "https://via.placeholder.com/120"}
                alt="Original Product"
                className="rounded w-24 h-24 object-cover border"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Returned</span>
              <img
                src={item.image || "https://via.placeholder.com/120"}
                alt="Return"
                className="rounded w-24 h-24 object-cover border"
              />
            </div>
          </div>
          <div className="font-bold text-gray-900 mb-2">{item.product}</div>
          <div className="text-xs text-gray-700 mb-2">Return ID: {item.id}</div>
          <div className="text-xs text-gray-700 mb-2">
            Risk:{" "}
            <span
              className={`font-bold ${
                item.riskLevel === "High"
                  ? "text-red-600"
                  : item.riskLevel === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {item.riskLevel}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-2 w-full">
            <div>
              Blur: <span className="font-bold">{item.blurScore}</span>
            </div>
            <div>
              SSIM: <span className="font-bold">{item.ssimScore}</span>
            </div>
            <div>
              Metadata: <span className="font-bold">{item.metadataScore}</span>
            </div>
            <div>
              Final: <span className="font-bold">{item.finalScore}</span>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <button
              className="btn-primary px-4 py-1 text-xs"
              onClick={() => handleAction("approve", item.id)}
            >
              Approve
            </button>
            <button
              className="btn-secondary px-4 py-1 text-xs"
              onClick={() => handleAction("reject", item.id)}
            >
              On Store
              Inspection
            </button>
            <button
              className="btn-secondary px-4 py-1 text-xs"
              onClick={() => handleAction("refund", item.id)}
            >
              Partial
              Refund
            </button>
          </div>
          <textarea
            className="w-full rounded border border-gray-300 p-2 text-xs text-gray-900"
            placeholder="Add comment (optional)"
          ></textarea>
        </div>
      ))}
      {localItems.length === 0 && (
        <div className="col-span-full text-center text-walmart-dark-gray py-8">
          No items to verify.
        </div>
      )}
    </div>
  );
}
