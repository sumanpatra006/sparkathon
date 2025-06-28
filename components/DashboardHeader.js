'use client';
import { useRouter } from 'next/navigation';
import { Bell, Search, Menu, User, Home } from 'lucide-react';

export default function DashboardHeader({ onMenuClick }) {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container-responsive mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-walmart-blue">Walmart Returns</h1>
                <p className="text-xs text-walmart-dark-gray">Smart Return System</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => router.push('/')}
              className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-walmart-blue hover:text-walmart-dark-blue hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search returns, customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walmart-blue focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@walmart.com</p>
              </div>
              <button className="w-8 h-8 bg-walmart-blue rounded-full flex items-center justify-center hover:bg-walmart-dark-blue transition-colors duration-200 cursor-pointer">
                <User className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 