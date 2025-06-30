export default function RecentReturnsTable({
  recentReturns,
  getStatusColor,
  getRiskColor,
  maxItems = 3,
  onReturnClick,
}) {
  const displayReturns = maxItems
    ? recentReturns.slice(0, maxItems)
    : recentReturns;
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Recent Returns</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-walmart-gray">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Return ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayReturns.map((returnItem) => (
              <tr
                key={returnItem.id}
                className="hover:bg-walmart-gray cursor-pointer"
                onClick={() => onReturnClick && onReturnClick(returnItem.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {returnItem.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {returnItem.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {returnItem.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${returnItem.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      returnItem.status
                    )}`}
                  >
                    {returnItem.status.charAt(0).toUpperCase() +
                      returnItem.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(
                      returnItem.risk
                    )}`}
                  >
                    {returnItem.risk.charAt(0).toUpperCase() +
                      returnItem.risk.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {returnItem.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
