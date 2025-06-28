export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-walmart-dark-blue mb-4">Business Impact</h2>
          <p className="text-xl text-walmart-dark-gray">Proven results that protect your bottom line</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-walmart-blue mb-2">$1.5B</div>
            <div className="text-walmart-dark-gray">Annual Savings</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-walmart-blue mb-2">95%</div>
            <div className="text-walmart-dark-gray">Fraud Detection Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-walmart-blue mb-2">60%</div>
            <div className="text-walmart-dark-gray">Faster Processing</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-walmart-blue mb-2">99.9%</div>
            <div className="text-walmart-dark-gray">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
} 