'use client';
import { useState } from 'react';
import { Menu, X, Home, User, Package, Settings, LogOut } from 'lucide-react';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Dashboard', icon: User, href: '/dashboard' },
    { name: 'Returns', icon: Package, href: '/returns' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-walmart-blue text-white hover:bg-walmart-dark-blue transition-colors duration-200 cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-walmart-blue">Walmart Returns</span>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-700 hover:text-walmart-blue"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* User Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-walmart-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">User Name</p>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
            </div>

            <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer text-red-600 hover:text-red-700 w-full">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
} 