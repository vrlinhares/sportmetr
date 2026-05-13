import { Link } from 'react-router';
import summitLogo from '../../imports/SportMetr_Summit_Logo_(1).png';

export function Events() {

  return (
    <section id="events" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#003a89]/10 text-[#003a89] rounded-full text-sm font-medium mb-6">
            Events
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
        </div>

        {/* Summit Logo */}
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={summitLogo}
            alt="SportMetr Summit"
            className="w-full max-w-2xl mx-auto mb-8 rounded-3xl"
          />
          <p className="text-2xl font-semibold text-gray-900 mb-2">
            SportMetr Summit BRA 2026
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Date & Location Coming Soon • Tickets Available Now
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/summit/about"
              className="px-8 py-4 bg-[#003a89] text-white rounded-full hover:bg-[#002a69] transition-all hover:scale-105 font-medium"
            >
              About the Summit
            </Link>
            <Link
              to="/summit/tickets"
              className="px-8 py-4 bg-[#c1ff72] text-gray-900 rounded-full hover:bg-[#b0ee61] transition-all hover:scale-105 font-medium"
            >
              Purchase Tickets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
