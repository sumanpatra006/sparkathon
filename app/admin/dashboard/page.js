"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardStats from "@/components/DashboardStats";
import RecentReturnsTable from "@/components/RecentReturnsTable";
import ImageVerificationList from "@/components/ImageVerificationList";
import api from "@/api/api";
import { toast } from "react-hot-toast";
import categories from "@/data/products";

function getStatusColor(status) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "flagged":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
function getRiskColor(risk) {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "high":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function ReturnsTable({ returns }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr className="bg-walmart-gray">
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Return ID
            </th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Customer
            </th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Product
            </th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Status
            </th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Risk Level
            </th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {returns.map((r) => (
            <tr key={r.id} className="border-b last:border-b-0">
              <td className="px-4 py-2 font-bold text-gray-900">{r.id}</td>
              <td className="px-4 py-2 text-gray-900">{r.customer}</td>
              <td className="px-4 py-2 text-gray-900">{r.product}</td>
              <td className="px-4 py-2 text-gray-900">
                ${r.amount.toFixed(2)}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    r.status
                  )}`}
                >
                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(
                    r.risk
                  )}`}
                >
                  {r.risk.charAt(0).toUpperCase() + r.risk.slice(1)}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-900">{r.date}</td>
            </tr>
          ))}
          {returns.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center py-8 text-walmart-dark-gray"
              >
                No returns found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Helper to map productId to original image
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [riskLevelFilter, setRiskLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [returnsData, setReturnsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReturns: 0,
    pendingReturns: 0,
    completedReturns: 0,
    fraudDetected: 0,
    totalSavings: 0,
    avgProcessingTime: 0,
    customerSatisfaction: 0,
  });
  const [fraudStats, setFraudStats] = useState({
    totalFraudAlerts: 0,
    criticalAlerts: 0,
    highAlerts: 0,
    mediumAlerts: 0,
  });
  const [selectedReturnId, setSelectedReturnId] = useState(null);
  const [returnDetails, setReturnDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminAction, setAdminAction] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [actionResult, setActionResult] = useState(null);

  useEffect(() => {
    async function fetchReturns() {
      setLoading(true);
      try {
        // Build query params for riskLevel and status
        let query = [];
        if (riskLevelFilter !== "all"){
          query.push(
            `risklevel=${
              riskLevelFilter.charAt(0).toUpperCase() + riskLevelFilter.slice(1)
            }`
          );
        }
          
        if (statusFilter !== "all") {
          query.push(`status=${statusFilter}`);
        }
        const url = `/v1/admin/return${
          query.length ? "?" + query.join("&") : ""
        }`;
        const res = await api.get(url);
        const returns = res.data.data.returns || [];
        setReturnsData(returns);
        // Calculate stats from returns
        setStats({
          totalReturns: returns.length,
          pendingReturns: returns.filter(
            (r) => r.status === "Pending Review" || r.status === "Initiated"
          ).length,
          completedReturns: returns.filter(
            (r) => r.status === "Approved" || r.status === "Completed"
          ).length,
          fraudDetected: returns.filter((r) => r.riskLevel === "High").length,
          totalSavings: returns.reduce(
            (sum, r) => sum + (r.order ? r.order.totalAmount : 0),
            0
          ),
          avgProcessingTime: 2.4, // Placeholder
          customerSatisfaction: 98.5,
        });
      } catch (err) {
        setReturnsData([]);
        setStats({
          totalReturns: 0,
          pendingReturns: 0,
          completedReturns: 0,
          fraudDetected: 0,
          totalSavings: 0,
          avgProcessingTime: 0,
          customerSatisfaction: 0,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchReturns();
  }, [riskLevelFilter, statusFilter]);

  useEffect(() => {
    async function fetchFraudStats() {
      try {
        const res = await api.get("/v1/admin/return?risklevel=High");
        const summary = res.data.data.summary || {};
        setFraudStats({
          totalFraudAlerts: summary.totalFraudAlerts || 0,
          criticalAlerts: summary.criticalAlerts || 0,
          highAlerts: summary.highAlerts || 0,
          mediumAlerts: summary.mediumAlerts || 0,
        });
      } catch (err) {
        setFraudStats({
          totalFraudAlerts: 0,
          criticalAlerts: 0,
          highAlerts: 0,
          mediumAlerts: 0,
        });
      }
    }
    fetchFraudStats();
  }, []);

  const mappedReturns = returnsData.map((r) => ({
    id: r._id,
    customer: r.user?.name || "N/A",
    product: r.order?.items?.map((i) => i.name).join(", ") || "N/A",
    amount: r.order?.totalAmount || 0,
    status: r.status || "pending",
    risk: r.riskLevel?.toLowerCase() || "low",
    date: r.returnDate ? new Date(r.returnDate).toLocaleDateString() : "",
  }));

  // Prepare items for image verification
  const imageVerificationItems = returnsData.map((r) => {
    const firstProduct = r.order?.items?.[0];
    return {
      id: r._id,
      product: firstProduct?.name || "N/A",
      productId: firstProduct?.productId,
      originalImage: getOriginalImage(firstProduct?.productId),
      image: r.imageUrl,
      blurScore: r.blurScore,
      ssimScore: r.ssimScore,
      metadataScore: r.metadataScore,
      finalScore: r.finalScore,
      status: r.status,
      riskLevel: r.riskLevel,
    };
  });

  const handleReturnClick = async (returnId) => {
    setSelectedReturnId(returnId);
    setReturnDetails(null);
    setActionResult(null);
    setDetailsLoading(true);
    try {
      const res = await api.get(`/v1/admin/return/${returnId}`);
      setReturnDetails(res.data.return);
    } catch (err) {
      toast.error("Failed to fetch return details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAdminAction = async (status) => {
    if (!selectedReturnId) {
      return;
    }
    setActionLoading(true);
    setActionResult(null);
    try {
      const payload = {
        riskLevel: returnDetails.riskLevel,
        action:
          adminAction ||
          (status === "Refunded" ? "refund" : status.toLowerCase()),
        refundAmount: status === "Refunded" ? Number(refundAmount) : undefined,
        status,
      };
      const res = await api.put(
        `/v1/admin/return/${selectedReturnId}`,
        payload
      );
      toast.success(res.data.message || "Return status updated");
      setActionResult(res.data);
      // Update status in modal and table
      setReturnDetails((prev) => ({
        ...prev,
        status: res.data.updatedStatus,
        refundAmount: res.data.refundAmount,
      }));
      setReturnsData((prev) =>
        prev.map((r) =>
          r._id === selectedReturnId
            ? { ...r, status: res.data.updatedStatus }
            : r
        )
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update return");
    } finally {
      setActionLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedReturnId(null);
    setReturnDetails(null);
    setAdminAction("");
    setRefundAmount("");
    setActionResult(null);
  };

  // Admin action handlers
  const handleVerifyApprove = async (id) => {
    try {
      const res = await api.put(`/v1/admin/return/${id}`, {
        status: "Approved",
      });
      toast.success(res.data.message || "Return approved");
      setReturnsData((prev) => prev.filter((r) => r._id !== id));
      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to approve return");
      return { success: false };
    }
  };
  const handleVerifyReject = async (id) => {
    try {
      const res = await api.put(`/v1/admin/return/${id}`, {
        status: "Rejected",
      });
      toast.success(res.data.message || "Return rejected");
      setReturnsData((prev) => prev.filter((r) => r._id !== id));
      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reject return");
      return { success: false };
    }
  };
  const handleVerifyRefund = async (id) => {
    const refundAmount = prompt("Enter refund amount:");
    if (!refundAmount){
      return { success: false };
    }
    try {
      const res = await api.put(`/v1/admin/return/${id}`, {
        status: "Refunded",
        action: "refund",
        refundAmount: Number(refundAmount),
      });
      toast.success(res.data.message || "Refund processed");
      setReturnsData((prev) => prev.filter((r) => r._id !== id));
      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to process refund");
      return { success: false };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:z-40 lg:pt-16">
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        <div className="flex-1 lg:ml-64 h-full overflow-y-auto">
          <div className="w-full px-2 sm:px-4 lg:px-8 py-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <DashboardStats stats={stats} />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <RecentReturnsTable
                    recentReturns={mappedReturns}
                    getStatusColor={getStatusColor}
                    getRiskColor={getRiskColor}
                    maxItems={3}
                    onReturnClick={handleReturnClick}
                  />
                </div>
              </div>
            )}
            {activeTab === "returns" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-walmart-dark-blue mb-6">
                  Returns
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search by customer, product, or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walmart-blue"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walmart-blue"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Initiated">Initiated</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <select
                    value={riskLevelFilter}
                    onChange={(e) => setRiskLevelFilter(e.target.value)}
                    className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walmart-blue"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <DashboardStats stats={stats} />
                <ReturnsTable
                  returns={mappedReturns.filter(
                    (r) =>
                      search === "" ||
                      r.customer.toLowerCase().includes(search.toLowerCase()) ||
                      r.product.toLowerCase().includes(search.toLowerCase()) ||
                      r.id.toLowerCase().includes(search.toLowerCase())
                  )}
                />
              </div>
            )}
            {activeTab === "verification" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-walmart-dark-blue mb-6">
                  Image Verification
                </h2>
                <ImageVerificationList
                  items={imageVerificationItems}
                  onApprove={handleVerifyApprove}
                  onReject={handleVerifyReject}
                  onRefund={handleVerifyRefund}
                />
              </div>
            )}
            {activeTab === "analytics" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-walmart-dark-blue mb-6">
                  Analytics & Reports
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-walmart-blue text-white rounded-lg p-4 text-center">
                    <div className="text-lg font-bold">
                      {fraudStats.totalFraudAlerts}
                    </div>
                    <div className="text-xs font-bold">Total Fraud Alerts</div>
                  </div>
                  <div className="bg-red-700 text-white rounded-lg p-4 text-center">
                    <div className="text-lg font-bold">
                      {fraudStats.criticalAlerts}
                    </div>
                    <div className="text-xs font-bold">Critical Alerts</div>
                  </div>
                  <div className="bg-red-500 text-white rounded-lg p-4 text-center">
                    <div className="text-lg font-bold">
                      {fraudStats.highAlerts}
                    </div>
                    <div className="text-xs font-bold">High Alerts</div>
                  </div>
                  <div className="bg-yellow-400 text-white rounded-lg p-4 text-center">
                    <div className="text-lg font-bold">
                      {fraudStats.mediumAlerts}
                    </div>
                    <div className="text-xs font-bold">Medium Alerts</div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="text-walmart-dark-gray mb-2">
                    [Chart Placeholder]
                  </div>
                  <div className="w-full h-32 bg-white rounded shadow-inner flex items-center justify-center text-gray-400">
                    Returns Over Time
                  </div>
                </div>
              </div>
            )}
            {activeTab === "qr-codes" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-walmart-dark-blue mb-6">
                  QR Code Management
                </h2>
                <p className="text-walmart-dark-gray">
                  QR code generation and management interface will be
                  implemented here.
                </p>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-walmart-dark-blue mb-6">
                  Settings
                </h2>
                <p className="text-walmart-dark-gray">
                  Settings interface will be implemented here.
                </p>
              </div>
            )}
            {/* Return Details Modal */}
            {selectedReturnId && (
              <div className="fixed inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 bg-opacity-40 flex items-center justify-center z-50">
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
                        <span className="font-bold">
                          {returnDetails.riskLevel}
                        </span>
                      </div>
                      <div className="mb-2 text-gray-700">
                        Reason:{" "}
                        <span className="font-normal">
                          {returnDetails.reason}
                        </span>
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
                      <div className="mt-4 flex flex-col gap-2">
                        <div className="font-semibold mb-1">Admin Actions:</div>
                        <div className="flex gap-2 mb-2">
                          <button
                            className="btn-primary"
                            disabled={actionLoading}
                            onClick={() => handleAdminAction("Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn-secondary"
                            disabled={actionLoading}
                            onClick={() => handleAdminAction("Rejected")}
                          >
                            On Store 
                            Inspection
                          </button>
                          <button
                            className="btn-secondary"
                            disabled={actionLoading}
                            onClick={() => setAdminAction("refund")}
                          >
                            Partial
                            Refund
                          </button>
                        </div>
                        {adminAction === "refund" && (
                          <div className="flex flex-col gap-2 mb-2">
                            <input
                              type="number"
                              min="1"
                              placeholder="Refund Amount"
                              value={refundAmount}
                              onChange={(e) => setRefundAmount(e.target.value)}
                              className="border rounded px-2 py-1"
                            />
                            <button
                              className="btn-primary"
                              disabled={actionLoading || !refundAmount}
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
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">
                      No details found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
