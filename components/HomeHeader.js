'use client';
import { useRouter } from 'next/navigation';
import MobileNavigation from './MobileNavigation';

export default function HomeHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300">
      <div className="container-responsive mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/') }>
            <div className="w-10 h-10 bg-walmart-blue rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-walmart-blue">Walmart Returns</h1>
              <p className="text-xs text-walmart-dark-gray">Smart Return System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-walmart-dark-gray hover:text-walmart-blue font-medium transition-colors duration-200 cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-walmart-dark-gray hover:text-walmart-blue font-medium transition-colors duration-200 cursor-pointer"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-walmart-dark-gray hover:text-walmart-blue font-medium transition-colors duration-200 cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="btn-ghost"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
} 