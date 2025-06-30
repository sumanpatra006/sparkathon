"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardStats from "@/components/DashboardStats";
import RecentReturnsTable from "@/components/RecentReturnsTable";
import api from "@/api/api";

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

  useEffect(() => {
    async function fetchReturns() {
      setLoading(true);
      try {
        // Build query params for riskLevel and status
        let query = [];
        if (riskLevelFilter !== "all")
          query.push(
            `risklevel=${
              riskLevelFilter.charAt(0).toUpperCase() + riskLevelFilter.slice(1)
            }`
          );
        if (statusFilter !== "all") query.push(`status=${statusFilter}`);
        const url = `/api/v1/admin/return${
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
          customerSatisfaction: 98.5, // Placeholder
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
        const res = await api.get("/api/v1/admin/return?risklevel=High");
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                    <img
                      src="https://via.placeholder.com/120"
                      alt="Product"
                      className="rounded mb-4 w-24 h-24 object-cover"
                    />
                    <div className="font-bold text-gray-900 mb-2">
                      Samsung TV 55"
                    </div>
                    <div className="text-xs text-gray-700 mb-2">
                      Return ID: RET-001
                    </div>
                    <div className="flex gap-2 mb-2">
                      <button className="btn-primary px-4 py-1 text-xs">
                        Approve
                      </button>
                      <button className="btn-secondary px-4 py-1 text-xs">
                        Reject
                      </button>
                    </div>
                    <textarea
                      className="w-full rounded border border-gray-300 p-2 text-xs text-gray-900"
                      placeholder="Add comment (optional)"
                    ></textarea>
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
