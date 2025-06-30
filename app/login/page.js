"use client";
import { useRouter } from "next/navigation";
import LoginHeader from "../../components/LoginHeader";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  const router = useRouter();

  // Add onLoginSuccess handler to redirect user to homepage
  const handleLoginSuccess = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-gray to-white flex flex-col">
      <LoginHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <LoginForm
            onSignup={() => router.push("/signup")}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    </div>
  );
}
