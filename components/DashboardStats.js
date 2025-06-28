import { Package, AlertTriangle, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-walmart-dark-gray">Total Returns</p>
            <p className="text-2xl font-bold text-walmart-dark-blue">{stats.totalReturns}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-walmart-blue" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">+12%</span>
          <span className="text-walmart-dark-gray ml-1">from last month</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-walmart-dark-gray">Fraud Detected</p>
            <p className="text-2xl font-bold text-walmart-dark-blue">{stats.fraudDetected}</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowDownRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">-8%</span>
          <span className="text-walmart-dark-gray ml-1">from last month</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-walmart-dark-gray">Total Savings</p>
            <p className="text-2xl font-bold text-walmart-dark-blue">${(stats.totalSavings / 1000000).toFixed(1)}M</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">+15%</span>
          <span className="text-walmart-dark-gray ml-1">from last month</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-walmart-dark-gray">Avg Processing Time</p>
            <p className="text-2xl font-bold text-walmart-dark-blue">{stats.avgProcessingTime}h</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowDownRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">-20%</span>
          <span className="text-walmart-dark-gray ml-1">from last month</span>
        </div>
      </div>
    </div>
  );
} 