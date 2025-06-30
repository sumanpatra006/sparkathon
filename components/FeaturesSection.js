import {
  TrendingUp,
  Camera,
  Zap,
  QrCode,
  Shield,
  Users,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-walmart-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-walmart-dark-blue mb-4">
            Advanced Features
          </h2>
          <p className="text-xl text-walmart-dark-gray max-w-2xl mx-auto">
            Our comprehensive solution addresses every aspect of return
            management with cutting-edge AI technology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-walmart-blue rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-walmart-dark-blue mb-4">
              AI Risk Scoring
            </h3>
            <p className="text-walmart-dark-gray mb-4">
              Advanced machine learning algorithms analyze customer behavior,
              return patterns, and product conditions to assign risk scores.
            </p>
            <ul className="space-y-2 text-sm text-walmart-dark-gray">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Customer behavior analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Return ratio calculation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time risk assessment</span>
              </li>
            </ul>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-walmart-blue rounded-lg flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-walmart-dark-blue mb-4">
              Image Verification
            </h3>
            <p className="text-walmart-dark-gray mb-4">
              Computer vision technology analyzes product images to detect
              damage, missing tags, and verify authenticity.
            </p>
            <ul className="space-y-2 text-sm text-walmart-dark-gray">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Damage detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Package authenticity</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Condition assessment</span>
              </li>
            </ul>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-walmart-blue rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-walmart-dark-blue mb-4">
              Automated Workflows
            </h3>
            <p className="text-walmart-dark-gray mb-4">
              Smart routing based on risk levels ensures efficient processing
              and appropriate handling for each return.
            </p>
            <ul className="space-y-2 text-sm text-walmart-dark-gray">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Instant refunds for low-risk</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Manual review for high-risk</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>QR code generation</span>
              </li>
            </ul>
          </div>
          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-walmart-blue rounded-lg flex items-center justify-center mb-6">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-walmart-dark-blue mb-4">
              Smart Return Points
            </h3>
            <p className="text-walmart-dark-gray mb-4">
              QR code-based return system with locker and store integration for
              seamless customer experience.
            </p>
            <ul className="space-y-2 text-sm text-walmart-dark-gray">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Locker drop-off</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Store integration</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time tracking</span>
              </li>
            </ul>
          </div>
          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-walmart-blue rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-walmart-dark-blue mb-4">
              Fraud Detection
            </h3>
            <p className="text-walmart-dark-gray mb-4">
              Advanced algorithms identify suspicious patterns, fake receipts,
              and wardrobing attempts in real-time.
            </p>
            <ul className="space-y-2 text-sm text-walmart-dark-gray">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Pattern recognition</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Receipt validation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Wardrobing detection</span>
              </li>
            </ul>
          </div>
          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-walmart-blue rounded-lg flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-walmart-dark-blue mb-4">
              Customer Experience
            </h3>
            <p className="text-walmart-dark-gray mb-4">
              Personalized return experiences with loyalty rewards and
              transparent status tracking.
            </p>
            <ul className="space-y-2 text-sm text-walmart-dark-gray">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Loyalty points</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Status tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Mobile dashboard</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Existing features */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100">
            <div className="bg-walmart-yellow rounded-full p-4 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-walmart-dark-blue">
              Secure Returns
            </h3>
            <p className="text-gray-600">Safe and protected return process</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100">
            <div className="bg-walmart-yellow rounded-full p-4 mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-walmart-dark-blue">
              Quick Processing
            </h3>
            <p className="text-gray-600">Fast return approval and refunds</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100">
            <div className="bg-walmart-yellow rounded-full p-4 mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-walmart-dark-blue">
              Free Shipping
            </h3>
            <p className="text-gray-600">No cost return shipping labels</p>
          </div>
          {/* New My Orders Status feature */}
          <button
            onClick={() => (window.location.href = "/orders")}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100 hover:bg-walmart-blue hover:text-white transition-colors"
            style={{ gridColumn: "span 1" }}
          >
            <div className="bg-walmart-yellow rounded-full p-4 mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-walmart-dark-blue group-hover:text-white">
              My Orders Status
            </h3>
            <p className="text-gray-600 group-hover:text-white">
              View your past orders and their status
            </p>
          </button>
          {/* New My Return Summaries feature */}
          <button
            onClick={() => (window.location.href = "/returns")}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100 hover:bg-walmart-blue hover:text-white transition-colors"
            style={{ gridColumn: "span 1" }}
          >
            <div className="bg-walmart-yellow rounded-full p-4 mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7v4a2 2 0 01-2 2H7a2 2 0 01-2-2V7m0 0V5a2 2 0 012-2h10a2 2 0 012 2v2m-2 0V5m0 2H7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-walmart-dark-blue group-hover:text-white">
              My Return Summaries
            </h3>
            <p className="text-gray-600 group-hover:text-white">
              View all your return requests and their status
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
