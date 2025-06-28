export default function ReturnsTable({ returns, getStatusColor, getRiskColor }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr className="bg-walmart-gray">
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Return ID</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Customer</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Product</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Amount</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Status</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Risk Level</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Date</th>
          </tr>
        </thead>
        <tbody>
          {returns.map(r => (
            <tr key={r.id} className="border-b last:border-b-0">
              <td className="px-4 py-2 font-bold text-gray-900">{r.id}</td>
              <td className="px-4 py-2 text-gray-900">{r.customer}</td>
              <td className="px-4 py-2 text-gray-900">{r.product}</td>
              <td className="px-4 py-2 text-gray-900">${r.amount.toFixed(2)}</td>
              <td className="px-4 py-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(r.status)}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
              </td>
              <td className="px-4 py-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(r.risk)}`}>{r.risk.charAt(0).toUpperCase() + r.risk.slice(1)}</span>
              </td>
              <td className="px-4 py-2 text-gray-900">{r.date}</td>
            </tr>
          ))}
          {returns.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-8 text-walmart-dark-gray">No returns found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 