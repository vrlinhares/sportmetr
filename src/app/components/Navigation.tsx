import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import logo from '../../imports/GC_Banner__2_-Picsart-BackgroundRemover.png';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position (only on home page)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    const sections = ['home', 'join'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [setActiveSection, location.pathname]);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home with hash
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'About', type: 'link' as const, path: '/about' },
    { id: 'network', label: 'Network', type: 'link' as const, path: '/network' },
    // { id: 'events', label: 'Events', type: 'link' as const, path: '/events' },
    { id: 'join', label: 'Join Us', type: 'link' as const, path: '/join' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#f6f5ef]/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,58,137,0.08)] border-b border-[#003a89]/10' : 'bg-[#f6f5ef]/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative"
          >
            <img src={logo} alt="SportMetr" className="h-14 w-auto transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-2deg]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.id}
                  to={item.path!}
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[#003a89] group ${
                    location.pathname === item.path ? 'text-[#003a89]' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                  <span className={`absolute left-4 right-4 -bottom-1 h-0.5 bg-[#ff751f] transition-transform duration-300 origin-left ${
                    location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[#003a89] group ${
                    activeSection === item.id && location.pathname === '/' ? 'text-[#003a89]' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                  <span className={`absolute left-4 right-4 -bottom-1 h-0.5 bg-[#ff751f] transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100`} />
                </button>
              )
            ))}
            <Link
              to="/apply"
              className="ml-4 group relative px-6 py-2.5 bg-[#ff751f] text-white rounded-full text-sm font-bold uppercase tracking-wider overflow-hidden transition-all hover:shadow-lg hover:scale-105"
            >
              <span className="absolute inset-0 bg-[#003a89] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Open a Chapter</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#003a89]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.id}
                  to={item.path!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[#003a89]/10 text-[#003a89]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.id && location.pathname === '/'
                      ? 'bg-[#003a89]/10 text-[#003a89]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            <Link
              to="/apply"
              className="w-full px-6 py-3 bg-[#ff751f] text-white rounded-full hover:bg-[#e66a1b] transition-colors font-medium text-center block"
            >
              Open a Chapter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}