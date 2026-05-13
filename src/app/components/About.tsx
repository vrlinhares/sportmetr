import { BookOpen, Globe, Lightbulb, Target } from 'lucide-react';
import vitorImage from '../../imports/IMG_3898__2_.png';
import guilhermeImage from '../../imports/3ee4c89b-72f0-43ae-a255-7628a343b403.jpg';

export function About() {
  const features = [
    {
      icon: <Target className="text-[#ff751f]" size={28} />,
      title: 'Our Mission',
      description: 'Empowering students to explore the intersection of sports business, analytics, and technology through collaborative learning and the exploration of real case studies.'
    },
    {
      icon: <Globe className="text-[#ff751f]" size={28} />,
      title: 'Global Network',
      description: 'Connect with like-minded students across multiple chapters and regions, sharing ideas, experiences, and opportunities.'
    },
    {
      icon: <BookOpen className="text-[#ff751f]" size={28} />,
      title: 'Continuous Learning',
      description: 'Engage in learning through ongoing club sessions, discussing solutions to industry problems and investigating real-world concepts.'
    },
    {
      icon: <Lightbulb className="text-[#ff751f]" size={28} />,
      title: 'Beyond The Data',
      description: 'Understand how context, decision-making, and human factors shape outcomes in sports, including how data is interpreted and translated into strategic choices.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#003a89]/10 text-[#003a89] rounded-full text-sm font-medium mb-6">
            About SportMetr
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Building the Future of Sports Through Business and Data
          </h2>
          <p className="text-lg text-gray-600">
            SportMetr is a community making sports analytics education more accessible, helping students understand the industry and see a place for themselves in it.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-gray-200 hover:border-[#003a89] hover:shadow-lg transition-all group"
            >
              <div className="mb-4 inline-flex p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors">
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

        {/* Founders Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Our Founders</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
            {/* Vitor */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#003a89] shadow-lg">
                <img
                  src={vitorImage}
                  alt="Vitor Linhares"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Vitor Linhares</h4>
              <p className="text-gray-600">Co-Founder & Head of Expansion</p>
            </div>

            {/* Guilherme */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#003a89] shadow-lg">
                <img
                  src={guilhermeImage}
                  alt="Guilherme Cavalcanti"
                  className="w-full h-full object-cover scale-[1.75] translate-x-3"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Guilherme Cavalcanti</h4>
              <p className="text-gray-600">Co-Founder & Lead Content Organiser</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
