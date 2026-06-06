import { Link } from 'react-router';
import { ArrowLeft, Check, Ticket } from 'lucide-react';

export function SummitTickets() {
  return (
    <main className="pt-28">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#003a89] hover:text-[#002a69] transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex p-4 bg-[#c1ff72] rounded-2xl mb-6">
              <Ticket className="text-[#003a89]" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Summit Tickets
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Elite tickets now on sale! Secure your spot at the first-ever SportMetr Summit and be part of this groundbreaking event.
            </p>
          </div>

          {/* Ticket Options */}
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {/* Elite Ticket */}
            <div className="bg-white border-2 border-[#c1ff72] rounded-3xl p-8 hover:border-[#003a89] transition-all shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex px-3 py-1 bg-[#c1ff72] text-gray-900 text-xs font-bold rounded-full mb-3">
                  NOW AVAILABLE
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Elite</h3>
                <div className="text-4xl font-bold text-gray-400 mb-2">???</div>
                <p className="text-gray-600">Lot 1</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Full summit access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">All keynote lectures and sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Networking events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Summit swag bag</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Meals and refreshments</span>
                </li>
              </ul>
              <button
                onClick={() => window.open('#', '_blank')}
                className="w-full px-8 py-4 bg-[#c1ff72] text-gray-900 rounded-full font-medium hover:bg-[#b0ee61] transition-all hover:scale-105"
              >
                Purchase Now
              </button>
            </div>

            {/* Pace Ticket */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-[#003a89] transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pace</h3>
                <div className="text-4xl font-bold text-gray-400 mb-2">???</div>
                <p className="text-gray-600">Lot 2</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Full summit access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">All keynote lectures and sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Networking events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Summit swag bag</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Meals and refreshments</span>
                </li>
              </ul>
              <button
                disabled
                className="w-full px-8 py-4 bg-gray-300 text-gray-600 rounded-full font-medium cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>

            {/* Clutch Ticket */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-[#003a89] transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Clutch</h3>
                <div className="text-4xl font-bold text-gray-400 mb-2">???</div>
                <p className="text-gray-600">Lot 3</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Full summit access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">All keynote lectures and sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Networking events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Summit swag bag</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#c1ff72] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Meals and refreshments</span>
                </li>
              </ul>
              <button
                disabled
                className="w-full px-8 py-4 bg-gray-300 text-gray-600 rounded-full font-medium cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#c1ff72]/20 rounded-2xl p-8 text-center border-2 border-[#c1ff72]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Elite Tickets Now Available!
              </h3>
              <p className="text-lg text-gray-600">
                Secure your Elite ticket today! Pace and Clutch tickets will be available soon.
              </p>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    When will tickets go on sale?
                  </h4>
                  <p className="text-gray-600">
                    Elite tickets (Lot 1) are now available for purchase! Pace (Lot 2) and Clutch (Lot 3) tickets will be released soon.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Who can attend the summit?
                  </h4>
                  <p className="text-gray-600">
                    The summit is open to all students interested in sports business, analytics, and technology. You don't need to be a SportMetr member to attend — everyone passionate about sports is welcome!
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What's included in the ticket price?
                  </h4>
                  <p className="text-gray-600">
                    All tickets include full access to keynote lectures, panel discussions, networking events, meals, refreshments, and a summit swag bag.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Is there a refund policy?
                  </h4>
                  <p className="text-gray-600">
                    Refund and cancellation policies will be announced when ticket sales open.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
