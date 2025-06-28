export default function CTASection() {
  return (
    <section className="py-20 bg-walmart-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Returns?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join Walmart in revolutionizing return management with AI-powered
          solutions that protect your business and delight your customers.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-4 bg-walmart-yellow text-walmart-dark-blue rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors">
            Start Free Trial
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-walmart-blue transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
} 