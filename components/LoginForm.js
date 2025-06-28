'use client';
import { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

export default function LoginForm({ onSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login attempt:', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-xl border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-walmart-dark-gray mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg input-focus text-gray-900 placeholder-gray-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              <Mail className="absolute left-3 top-3 h-5 w-5 text-walmart-dark-gray" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-walmart-dark-gray mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-3 pr-10 border rounded-lg input-focus text-gray-900 placeholder-gray-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-walmart-dark-gray hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-walmart-dark-gray hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-walmart-blue focus:ring-walmart-blue border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-walmart-dark-gray cursor-pointer">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-walmart-blue hover:text-walmart-dark-blue transition-colors cursor-pointer">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full btn-primary py-3 text-base font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-walmart-dark-gray">
            Don't have an account?{' '}
            <button 
              onClick={onSignup} 
              className="font-medium text-walmart-blue hover:text-walmart-dark-blue transition-colors cursor-pointer"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 