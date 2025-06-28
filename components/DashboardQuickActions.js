import { Camera, QrCode, BarChart3 } from 'lucide-react';

export default function DashboardQuickActions() {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 overflow-x-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm min-w-[260px] flex-1">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-walmart-blue rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-walmart-dark-blue">Image Verification</h3>
        </div>
        <p className="text-walmart-dark-gray mb-4">
          Review and verify product images for return authenticity
        </p>
        <button className="w-full bg-walmart-blue text-white py-2 px-4 rounded-lg hover:bg-walmart-dark-blue transition-colors">
          Start Verification
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm min-w-[260px] flex-1">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-walmart-blue rounded-lg flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-walmart-dark-blue">Generate QR Code</h3>
        </div>
        <p className="text-walmart-dark-gray mb-4">
          Create QR codes for return drop-off points
        </p>
        <button className="w-full bg-walmart-blue text-white py-2 px-4 rounded-lg hover:bg-walmart-dark-blue transition-colors">
          Generate Code
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm min-w-[260px] flex-1">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-walmart-blue rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-walmart-dark-blue">View Analytics</h3>
        </div>
        <p className="text-walmart-dark-gray mb-4">
          Access detailed analytics and reporting
        </p>
        <button className="w-full bg-walmart-blue text-white py-2 px-4 rounded-lg hover:bg-walmart-dark-blue transition-colors">
          View Reports
        </button>
      </div>
    </div>
  );
} 