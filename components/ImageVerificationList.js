export default function ImageVerificationList({ items, onApprove, onReject }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
          <img src={item.image || 'https://via.placeholder.com/120'} alt="Product" className="rounded mb-4 w-24 h-24 object-cover" />
          <div className="font-bold text-gray-900 mb-2">{item.product}</div>
          <div className="text-xs text-gray-700 mb-2">Return ID: {item.id}</div>
          <div className="flex gap-2 mb-2">
            <button className="btn-primary px-4 py-1 text-xs" onClick={() => onApprove && onApprove(item.id)}>Approve</button>
            <button className="btn-secondary px-4 py-1 text-xs" onClick={() => onReject && onReject(item.id)}>Reject</button>
          </div>
          <textarea className="w-full rounded border border-gray-300 p-2 text-xs text-gray-900" placeholder="Add comment (optional)"></textarea>
        </div>
      ))}
      {items.length === 0 && (
        <div className="col-span-full text-center text-walmart-dark-gray py-8">No items to verify.</div>
      )}
    </div>
  );
} 