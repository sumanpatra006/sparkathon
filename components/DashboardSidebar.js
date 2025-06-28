import { Home, Package, Camera, QrCode, BarChart3, Settings, LogOut, X } from 'lucide-react';

const navItems = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'returns', label: 'Returns', icon: Package },
  { key: 'verification', label: 'Image Verification', icon: Camera },
  { key: 'qr-codes', label: 'QR Codes', icon: QrCode },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar({ activeTab, onTabChange, isOpen, onClose }) {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-sm min-h-screen z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex lg:hidden justify-end p-4">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { onTabChange(key); onClose && onClose(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === key
                    ? 'bg-walmart-blue text-white'
                    : 'text-walmart-dark-gray hover:bg-walmart-gray'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-walmart-dark-gray hover:bg-walmart-gray rounded-lg transition-colors mt-2">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
} 