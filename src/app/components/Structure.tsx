import { Building2, MessageCircle, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function Structure() {
  const stats = [
    { value: '5', label: 'Chapters' },
    { value: '3', label: 'States' },
    { value: '2', label: 'Countries' }
  ];

  const networkFeatures = [
    {
      icon: <Building2 className="text-[#ff751f]" size={32} />,
      title: 'Local Chapters',
      description: 'Independent student groups at high schools, each with their own leadership and focus areas.'
    },
    {
      icon: <Network className="text-[#ff751f]" size={32} />,
      title: 'Shared Resources',
      description: 'Access to collective knowledge base, tools, and learning materials across the network.'
    },
    {
      icon: <MessageCircle className="text-[#ff751f]" size={32} />,
      title: 'Central Community',
      description: 'WhatsApp community connecting all members for collaboration, support, and opportunity sharing.'
    }
  ];

  return (
    <section id="structure" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#003a89]/10 text-[#003a89] rounded-full text-sm font-medium mb-6">
            Network Structure
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            A Distributed Network, A Unified Mission
          </h2>
          <p className="text-lg text-gray-600">
            SportMetr operates through a decentralised network of high school chapters, connected and supported by our core team through a shared Whatsapp Community.
          </p>
        </div>

        {/* Network Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {networkFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center"
            >
              <div className="inline-flex p-4 bg-gray-100 rounded-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Network Stats */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Reach
          </h3>
          <div className="grid grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-[#003a89] transition-all text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-[#003a89] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Start a Chapter Section */}
          <div className="bg-[#003a89] rounded-2xl p-8 md:p-12 text-white text-center">
            <Building2 size={48} className="mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Open a Chapter at Your School
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Interested in bringing SportMetr to your high school? Fill out our application form to start a new chapter and join our growing network of student leaders exploring sports business, analytics, and technology.
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#003a89] rounded-full hover:bg-gray-50 transition-all hover:scale-105 font-medium"
            >
              Apply to Start a Chapter
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
