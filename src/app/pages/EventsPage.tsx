import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Events } from '../components/Events';

export function EventsPage() {
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

      <Events />
    </main>
  );
}
