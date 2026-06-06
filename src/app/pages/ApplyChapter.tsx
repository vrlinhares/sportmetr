import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, CheckCircle, School } from 'lucide-react';

export function ApplyChapter() {
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
            <div className="inline-flex p-4 bg-[#ff751f]/20 rounded-2xl mb-6">
              <School className="text-[#ff751f]" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Open a Chapter at Your School
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bring SportMetr to your high school and join our growing network of student leaders exploring sports business, analytics, and technology.
            </p>
          </div>

          {/* What You'll Receive */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-[#003a89]/5 rounded-2xl p-8 md:p-12 border border-[#003a89]/20">
              <h3 className="text-2xl md:text-3xl font-bold text-[#003a89] mb-6">
                We are currently selecting students to lead new chapters, receiving:
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#003a89] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">Ready-to-use session materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#003a89] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">Guidance on structure and organisation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#003a89] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">Direct support from the founding team</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                Chapters operate independently, with flexibility to develop their own activities – from football and basketball to robotics and e-sports.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#003a89] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Apply</h3>
                <p className="text-gray-600">
                  Fill out our application form with information about yourself and your school.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#003a89] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Review</h3>
                <p className="text-gray-600">
                  Our team will review your application and get in touch within a few days.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#003a89] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Launch</h3>
                <p className="text-gray-600">
                  Once approved, we'll help you set up and launch your chapter!
                </p>
              </div>
            </div>

          </div>

          {/* Requirements */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We're Looking For</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-gray-200">
                <CheckCircle className="text-[#c1ff72] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Passionate Student Leaders</h4>
                  <p className="text-gray-600">
                    Students excited about sports business, analytics, and technology who want to build a community.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-gray-200">
                <CheckCircle className="text-[#c1ff72] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">High School Based</h4>
                  <p className="text-gray-600">
                    Chapters are for high school students. You should be currently enrolled at your school.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-gray-200">
                <CheckCircle className="text-[#c1ff72] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Commitment to Regular Meetings</h4>
                  <p className="text-gray-600">
                    Ability to organize and lead regular club sessions discussing sports industry topics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-gray-200">
                <CheckCircle className="text-[#c1ff72] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Collaborative Spirit</h4>
                  <p className="text-gray-600">
                    Willingness to share ideas and collaborate with other chapters in the network.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#003a89] rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-white/90 mb-8">
                Fill out our application form and join the SportMetr network. We'll be in touch soon!
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdKhn1sz-up-KqgAdC_LDqWA4iLeIyjo3bnAqTd10h919p1lA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#c1ff72] text-gray-900 rounded-full hover:bg-[#b0ee61] transition-all hover:scale-105 font-medium text-lg shadow-lg"
              >
                Apply Now
                <ExternalLink size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
