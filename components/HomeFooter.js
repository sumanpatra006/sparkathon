import { Shield } from 'lucide-react';

export default function HomeFooter() {
  return (
    <footer className="bg-walmart-dark-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8" />
              <span className="text-xl font-bold">Walmart Smart Returns</span>
            </div>
            <p className="text-sm opacity-80">
              Advanced AI-powered return management system designed to prevent fraud
              and enhance customer experience.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>AI Risk Scoring</li>
              <li>Image Verification</li>
              <li>Fraud Detection</li>
              <li>Automated Workflows</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Contact Support</li>
              <li>Training</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm opacity-80">
          © 2024 Walmart Smart Returns. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 