import { Mail, UserPlus } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../../imports/GC_Banner_(3).png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003a89] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Section */}
        <div className="text-center mb-12">
          <img src={logo} alt="SportMetr" className="h-24 w-auto mb-6 mx-auto" />
          <p className="text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            A student-led network bridging sports business, analytics, and technology.
            Building the future of sports through collaborative learning.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:sportmetr.team@gmail.com"
              className="px-8 py-4 bg-[#c1ff72] hover:bg-[#b0ee61] text-gray-900 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center gap-3 group"
            >
              <Mail size={20} />
              Email Us
            </a>
            <Link
              to="/join"
              className="px-8 py-4 bg-[#ff751f] hover:bg-[#e66a1b] text-white rounded-full font-medium transition-all hover:scale-105 inline-flex items-center gap-3 group"
            >
              <UserPlus size={20} />
              Join Us
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} SportMetr. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
