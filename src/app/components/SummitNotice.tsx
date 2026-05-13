import { Link } from 'react-router';
import { ArrowRight, Calendar } from 'lucide-react';
import summitLogo from '../../imports/SportMetr_Summit_Logo_(1).png';

export function SummitNotice() {
  return (
    <section className="pt-24 pb-6 lg:pt-28 lg:pb-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
          <div className="grid md:grid-cols-[300px_1fr] gap-6 items-center p-6">
            {/* Image */}
            <div>
              <img
                src={summitLogo}
                alt="SportMetr Summit BRA"
                className="w-full rounded-xl"
              />
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#003a89]/10 text-[#003a89] rounded-full text-xs font-medium mb-2">
                <Calendar size={14} />
                Upcoming Event
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                SportMetr Summit BRA
              </h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                An immersive event featuring industry leaders in sports business, analytics, and technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#003a89] text-white rounded-full hover:bg-[#002a69] transition-all hover:scale-105 text-sm font-medium group"
                >
                  View Details
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/summit/tickets"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#c1ff72] text-gray-900 rounded-full hover:bg-[#b0ee61] transition-all hover:scale-105 text-sm font-medium"
                >
                  Get Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
