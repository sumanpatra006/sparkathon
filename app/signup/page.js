'use client';
import { useRouter } from 'next/navigation';
import SignupHeader from '../../components/SignupHeader';
import SignupForm from '../../components/SignupForm';

export default function Signup() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-gray to-white flex flex-col">
      <SignupHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <SignupForm onLogin={() => router.push('/login')} />
        </div>
      </div>
    </div>
  );
} 