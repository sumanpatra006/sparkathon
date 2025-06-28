'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, Clock, Truck } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  const features = [
    {
      icon: Shield,
      title: 'Secure Returns',
      description: 'Safe and protected return process'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast return approval and refunds'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'No cost return shipping labels'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-walmart-blue via-blue-600 to-walmart-dark-blue overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-walmart-yellow rounded-full blur-3xl"></div>
      </div>

      <div className="container-responsive mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-responsive-2xl font-bold text-white mb-6 leading-tight">
            Smart Returns Made
            <span className="block text-walmart-yellow">Simple & Secure</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-responsive text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of returns with Walmart's AI-powered smart return system. 
            Get instant approvals, track your returns in real-time, and receive faster refunds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => router.push('/signup')}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Sign In to Account
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 card-hover"
              >
                <div className="w-12 h-12 bg-walmart-yellow rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-walmart-dark-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">Trusted by millions of customers</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white/50 text-xs">✓ 99.9% Uptime</div>
              <div className="text-white/50 text-xs">✓ SSL Secured</div>
              <div className="text-white/50 text-xs">✓ 24/7 Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
} 