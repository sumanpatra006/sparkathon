'use client';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft } from 'lucide-react';

export default function SignupHeader() {
  const router = useRouter();

  return (
    <div className="text-center py-8 px-4">
      <button 
        onClick={() => router.push('/')} 
        className="inline-flex items-center text-walmart-blue hover:text-walmart-dark-blue mb-6 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-walmart-blue rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-walmart-dark-blue">Create Account</h2>
      <p className="mt-2 text-walmart-dark-gray text-sm sm:text-base">Join Walmart Smart Returns today</p>
    </div>
  );
} 