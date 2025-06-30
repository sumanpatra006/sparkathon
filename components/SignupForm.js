"use client";
import { useState } from "react";
import { Eye, EyeOff, User, Mail } from "lucide-react";
import api from "../api/api";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function SignupForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [registerAs, setRegisterAs] = useState("user"); // 'user' or 'admin'

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const endpoint =
          registerAs === "admin" ? "/v1/admin/new" : "/v1/users/new";
        const payload = {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        };
        const res = await api.post(endpoint, payload);
        toast.success(res.data.message || "Signup Successfully");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        if (onLogin) onLogin();
      } catch (err) {
        toast.error(err?.response?.data?.message || "Signup failed");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-xl border border-gray-100">
          {/* Toggler */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-lg border ${
                registerAs === "user"
                  ? "bg-walmart-blue text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setRegisterAs("user")}
            >
              Register as User
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-lg border ${
                registerAs === "admin"
                  ? "bg-walmart-blue text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setRegisterAs("admin")}
            >
              Register as Admin
            </button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-walmart-dark-gray mb-2"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg input-focus text-gray-900 placeholder-gray-500 ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your username"
                />
                <User className="absolute left-3 top-3 h-5 w-5 text-walmart-dark-gray" />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-walmart-dark-gray mb-2"
              >
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
                    errors.email ? "border-red-500" : "border-gray-300"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-walmart-dark-gray mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-3 pr-10 border rounded-lg input-focus text-gray-900 placeholder-gray-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Create a password"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-walmart-dark-gray mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-3 pr-10 border rounded-lg input-focus text-gray-900 placeholder-gray-500 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-walmart-dark-gray hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-walmart-dark-gray hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 mt-1 text-walmart-blue focus:ring-walmart-blue border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm text-walmart-dark-gray"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-walmart-blue hover:text-walmart-dark-blue transition-colors cursor-pointer"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-walmart-blue hover:text-walmart-dark-blue transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <div>
              <button
                type="submit"
                className="w-full btn-primary py-3 text-base font-semibold"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-walmart-dark-gray">
              Already have an account?{" "}
              <button
                onClick={onLogin}
                className="font-medium text-walmart-blue hover:text-walmart-dark-blue transition-colors cursor-pointer"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
