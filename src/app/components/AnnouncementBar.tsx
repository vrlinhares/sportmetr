import { Link } from 'react-router';
import { Megaphone, ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-[#003a89] text-white py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/summit/about"
          className="flex items-center justify-center gap-3 hover:opacity-90 transition-opacity group"
        >
          <Megaphone size={18} className="flex-shrink-0" />
          <span className="text-sm md:text-base font-medium text-center">
            <span className="hidden sm:inline">Introducing </span>
            <span className="font-bold">SportMetr Summit BRA 2026</span>
            <span className="hidden sm:inline"> - Tickets Now Available!</span>
          </span>
          <ArrowRight size={18} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
