import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {

  return (
    <section id="home" className="min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#003a89]/10 text-[#003a89] rounded-full text-sm font-medium mb-8">
            <Zap size={16} />
            Student-Led Initiative
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Learn the
            <br />
            <span className="text-[#003a89]">
              Game Behind the Game
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            SportMetr is a student-led network bridging the gap between sports business, analytics, and technology.
            Join a community of passionate learners exploring the future of sports through collaborative learning and real case studies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="px-8 py-4 bg-[#c1ff72] text-gray-900 rounded-full hover:bg-[#b0ee61] transition-all hover:scale-105 font-medium flex items-center justify-center gap-2 group"
            >
              Open a Chapter
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-[#003a89] text-[#003a89] rounded-full hover:bg-[#003a89] hover:text-white transition-all font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
