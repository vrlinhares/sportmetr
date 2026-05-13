import { MessageCircle, Mail } from 'lucide-react';
import logo from '../../imports/GC_Banner_(3).png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleJoinClick = () => {
    const element = document.getElementById('join');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <button
              onClick={handleJoinClick}
              className="px-8 py-4 bg-[#c1ff72] hover:bg-[#b0ee61] text-gray-900 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center gap-3 group"
            >
              <MessageCircle size={20} />
              WhatsApp Community
            </button>
            <a
              href="mailto:sportmetr.team@gmail.com"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-[#003a89] rounded-full font-medium transition-all hover:scale-105 inline-flex items-center gap-3 group"
            >
              <Mail size={20} />
              Email Us
            </a>
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
