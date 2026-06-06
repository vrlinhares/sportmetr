import { Link } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Users, Target } from 'lucide-react';
import summitLogo from '../../imports/SportMetr_Summit_Logo_(1).png';

export function SummitAbout() {
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
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <img
              src={summitLogo}
              alt="SportMetr Summit"
              className="w-full max-w-2xl mx-auto mb-8 rounded-3xl"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              SportMetr Summit BRA 2026
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us in Brazil for the first-ever SportMetr Summit featuring keynote lectures from industry leaders in sports business, analytics, and technology.
            </p>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Calendar className="text-[#ff751f] mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">Date</h3>
              <p className="text-gray-600">Coming Soon</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <MapPin className="text-[#ff751f] mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Brazil (City TBA)</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Users className="text-[#ff751f] mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-gray-900 mb-2">Attendees</h3>
              <p className="text-gray-600">Open to All Students</p>
            </div>
          </div>

          {/* About Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              About the Summit
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-12">
              <p>
                The SportMetr Summit BRA is our flagship event taking place in Brazil. This summit brings together students passionate about sports with leading professionals from the sports business, analytics, and technology industries.
              </p>
              <p>
                Open to all interested students — you don't need to be a SportMetr member to attend. Experience engaging keynote lectures from big names in the industry, network with like-minded peers, and gain insights into the future of sports through data and technology.
              </p>
            </div>

            {/* What to Expect */}
            <div className="bg-[#003a89] rounded-3xl p-8 md:p-12 text-white mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <Target size={32} />
                What to Expect
              </h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-[#c1ff72] text-2xl">•</span>
                  <span>Keynote lectures from leading professionals in sports business, analytics, and technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c1ff72] text-2xl">•</span>
                  <span>Insights from big names in the sports industry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c1ff72] text-2xl">•</span>
                  <span>Networking opportunities with students and professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c1ff72] text-2xl">•</span>
                  <span>Panel discussions on real-world industry challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c1ff72] text-2xl">•</span>
                  <span>Exclusive access to industry leaders and mentors</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/summit/tickets"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#c1ff72] text-gray-900 rounded-full hover:bg-[#b0ee61] transition-all hover:scale-105 font-medium text-lg shadow-lg"
              >
                Get Your Tickets
              </Link>
              <p className="text-gray-500 mt-4 text-sm">
                Registration opening soon
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
